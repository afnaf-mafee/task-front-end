import {
  useCompleteTaskMutation,
  useGetTaskQuery,
  useGetCompletedTasksQuery,
  usePayUserMutation,
} from "../../../redux/services/task/taskApiServices";

import useAuthData from "../../../hooks/useAuthData";
import GlassCardV2 from "../../GlassCard/GlassCardV2";
import GlassCard from "../../GlassCard/GlassCard";
import img from "../../../assets/icon/newbe.png";
import { useNavigate } from "react-router-dom";
import { useGetUserBalanceQuery } from "../../../redux/services/auth/authApiService";

const Task = () => {
  const { user } = useAuthData();
  const navigate = useNavigate();
  const {
      data: balanceData,
      isLoading,
      isFetching,
    } = useGetUserBalanceQuery(user?.userId, {
      skip: !user?.userId,
    });
  
  

  // =====================================================
  // 🇧🇩 BANGLADESH TIME FUNCTION
  // =====================================================
  const getBDDate = () => {
    const now = new Date();
    return new Date(
      now.toLocaleString("en-US", {
        timeZone: "Asia/Dhaka",
      })
    );
  };

  // =====================================================
  // AUTO LEVEL FROM DEPOSIT
  // =====================================================
  const getUserLevel = (deposit) => {
    if (deposit >= 8000) return { level: "Four", days: 10 };
    if (deposit >= 5001) return { level: "Three", days: 15 };
    if (deposit >= 3001) return { level: "Two", days: 15 };
    if (deposit >= 1000) return { level: "One", days: 15 };
    return { level: "Basic", days: 3 };
  };

  const LEVEL_CONFIG = {
    Basic: { tasksPerDay: 2, reward: 20 },
    One: { tasksPerDay: 6, reward: 25 },
    Two: { tasksPerDay: 8, reward: 32 },
    Three: { tasksPerDay: 10, reward: 50 },
    Four: { tasksPerDay: 15, reward: 80 },
  };

  const depositAmount = balanceData?.available_balance ?? 0;
  // const depositAmount = 8000
  const { level, days } = getUserLevel(depositAmount);
  const levelSettings = LEVEL_CONFIG[level];
  


  // =====================================================
  // FETCH TASKS
  // =====================================================
  const { data: allTask } = useGetTaskQuery();
  const TASKS_DATA = allTask?.data || [];

  const { data: completedTasksData } =
    useGetCompletedTasksQuery(user?.userId);

  const completedIds =
    completedTasksData?.completedTasks?.map((t) =>
      t._id?.toString()
    ) || [];

  const [completeTask] = useCompleteTaskMutation();
  const [payUser] = usePayUserMutation();

  // =====================================================
  // ✅ DAILY SYSTEM (BD TIME BASED)
  // =====================================================
  const tasksPerDay = levelSettings.tasksPerDay;
  const totalDays = days;

  const bdToday = getBDDate();

  // user.taskStartDate must be saved after deposit
  const startDate = user?.taskStartDate
    ? new Date(user.taskStartDate)
    : bdToday;

  const diffTime = bdToday - startDate;

  const currentDay = Math.floor(
    diffTime / (1000 * 60 * 60 * 24)
  );

  const startIndex = currentDay * tasksPerDay;

  const todayTasks = TASKS_DATA.slice(
    startIndex,
    startIndex + tasksPerDay
  );

  const totalCompleted = completedIds.length;

  // =====================================================
  // COMPLETE TASK
  // =====================================================
  const handleAction = async (task) => {
    if (!user?.userId || !task?._id) return;

    // ❌ Prevent future task completion
    const allowed = todayTasks.find(
      (t) => t._id === task._id
    );
    if (!allowed) return;

    try {
      await completeTask({
        userId: user.userId,
        taskId: task._id,
      }).unwrap();

      await payUser({
        userId: user.userId,
        amount: levelSettings.reward,
      }).unwrap();

      console.log("🎉 Payment Success");
    } catch (err) {
      console.error(err);
    }
  };

  // =====================================================
  // UI
  // =====================================================
  
  return (
    <>
      {totalCompleted >= tasksPerDay * totalDays ? (
        <GlassCard>
          <div className="space-y-3 flex flex-col items-center">
            <img src={img} width={100} />

            <h4 className="text-white text-center">
              🎉 Target Completed! Deposit Again To Continue
            </h4>

            <button
              onClick={() => navigate("/deposit")}
              className="w-full px-4 py-3 rounded-2xl text-white font-black bg-gradient-to-r from-purple-600 to-indigo-600"
            >
              Deposit Now
            </button>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-3 mt-3 font-urbanist">
          <p className="text-white font-bold uppercase text-sm">
            Today's Tasks — {level} Level
          </p>

          {todayTasks.map((task) => {
            const isCompleted = completedIds.includes(
              task._id.toString()
            );

            return (
              <div
                key={task._id}
                style={{
                  borderRadius: 18,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    background: task.gradient,
                    borderRadius: 18,
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: "rgba(255,255,255,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {task.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p className="text-white font-bold text-sm">
                      {task.title}
                    </p>
                    <p className="text-white font-extrabold text-xl">
                      ${task.reward.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAction(task)}
                    disabled={isCompleted}
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      borderRadius: 12,
                      padding: "8px 14px",
                      color: "#312e81",
                      fontWeight: 700,
                      cursor: isCompleted
                        ? "default"
                        : "pointer",
                      opacity: isCompleted ? 0.5 : 1,
                    }}
                  >
                    {isCompleted ? "✅ Done" : task.label}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Progress */}
          <GlassCardV2 className="flex items-center gap-3">
            <span className="text-white text-sm font-semibold">
              Daily Progress:
              {
                completedIds.filter((id) =>
                  todayTasks.some((t) => t._id === id)
                ).length
              }
              /{todayTasks.length}
            </span>

            <div className="flex-1 h-2 bg-white/10 rounded-full">
              <div
                className="h-full bg-yellow-400 rounded-full"
                style={{
                  width: `${
                    (completedIds.filter((id) =>
                      todayTasks.some((t) => t._id === id)
                    ).length /
                      todayTasks.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </GlassCardV2>
        </div>
      )}
    </>
  );
};

export default Task;