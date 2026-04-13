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

const Task = () => {
  const { user } = useAuthData();
  const navigate = useNavigate()

  // =====================================================
  //  AUTO LEVEL FROM DEPOSIT
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

  const depositAmount = user?.depositAmount || 0;
  // const depositAmount = 2000

  const { level, days } = getUserLevel(depositAmount);
  const levelSettings = LEVEL_CONFIG[level];
console.log(level);
  // =====================================================
  // FETCH TASKS
  // =====================================================
  const { data: allTask } = useGetTaskQuery();
  const TASKS_DATA = allTask?.data || [];

  const { data: completedTasksData } =
    useGetCompletedTasksQuery(user?.userId);

  const completedIds =
    completedTasksData?.completedTasks?.map((t) =>
      t._id?.toString(),
    ) || [];

  const [completeTask] = useCompleteTaskMutation();
  const [payUser] = usePayUserMutation();

  // =====================================================
  // PROFESSIONAL TASK DAY SYSTEM (FIXED)
  // =====================================================

  const tasksPerDay = levelSettings.tasksPerDay;
  const totalDays = days;

  const totalCompleted = completedIds.length;

  // calculate current day from completed task
  const currentDay = Math.floor(
    totalCompleted / tasksPerDay,
  );

  const startIndex = currentDay * tasksPerDay;

  const todayTasks = TASKS_DATA.slice(
    startIndex,
    startIndex + tasksPerDay,
  );

  // =====================================================
  // COMPLETE TASK
  // =====================================================
  const handleAction = async (task) => {
    if (!user?.userId || !task?._id) return;

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

  
  return (
    <>
      {totalCompleted >= tasksPerDay * totalDays ? (
        <GlassCard>
          <div className="space-y-3 flex flex-col items-center">
            <img src={img} width={100} />

            <h4 className="text-white text-center">
              🎉 Target Completed! Deposit Again To Continue
            </h4>

            <button onClick={() => navigate('/deposit')} className=" cursor-pointer w-full px-4 py-3 rounded-2xl text-white font-black bg-gradient-to-r from-purple-600 to-indigo-600">
              Deposit Now
            </button>
          </div>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          <p className="text-white/80 font-bold uppercase text-sm">
            Today's Tasks — {level} Level
          </p>

          {todayTasks.map((task) => (
           <div
                key={task._id}
                style={{
                  position: "relative",
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
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      fontSize: 22,
                      background: "rgba(255,255,255,0.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {task.icon}
                  </div>

                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: 13,
                        margin: 0,
                      }}
                    >
                      {task.title}
                    </p>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.95)",
                        fontWeight: 800,
                        fontSize: 20,
                        margin: "2px 0 0",
                      }}
                    >
                      ${task.reward.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAction(task)}
                    disabled={completedIds.includes(task._id)}
                    style={{
                      background: "rgba(255,255,255,0.88)",
                      border: "none",
                      borderRadius: 12,
                      padding: "8px 14px",
                      color: "#312e81",
                      fontWeight: 700,
                      fontSize: 12,
                      cursor: completedIds.includes(task._id)
                        ? "default"
                        : "pointer",
                      opacity: completedIds.includes(task._id) ? 0.5 : 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {completedIds.includes(task._id) ? "✅ Done" : task.label}
                  </button>
                </div>
              </div>
          ))}

          {/* Progress */}
          <GlassCardV2 className="flex items-center gap-3">
            <span className="text-white text-sm font-semibold">
              Daily Progress:
              {
                completedIds.filter((id) =>
                  todayTasks.some((t) => t._id === id),
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
                      todayTasks.some((t) => t._id === id),
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