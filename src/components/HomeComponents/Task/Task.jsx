import React from "react";
import GlassCard from "../../GlassCard/GlassCard";
import {
  useCompleteTaskMutation,
  useGetTaskQuery,
  useGetCompletedTasksQuery,
  usePayUserMutation,
} from "../../../redux/services/task/taskApiServices";
import useAuthData from "../../../hooks/useAuthData";

const Task = () => {
  const { user } = useAuthData();

  // Fetch all tasks
  const { data: allTask } = useGetTaskQuery();
  const TASKS_DATA = allTask?.data || [];

  // Fetch completed tasks for the user
  const { data: completedTasksData } = useGetCompletedTasksQuery(user?.userId);
  const completedIds = completedTasksData?.completedTasks?.map((t) =>
    t._id?.toString()
  ) || [];

  const [completeTask] = useCompleteTaskMutation();
  const [payUser] = usePayUserMutation()

  // Bangladesh time logic
  const tasksPerDay = 2;
  const totalDays = 3;
  const now = new Date();
  const bangladeshOffset = 6 * 60; // UTC+6 in minutes
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const bangladeshTime = new Date(utc + bangladeshOffset * 60000);
  const todayBD = bangladeshTime.getDate();
  const startIndex = ((todayBD - 1) % totalDays) * tasksPerDay;
  const todayTasks = TASKS_DATA.slice(startIndex, startIndex + tasksPerDay);

  // Handle task completion
  const handleAction = async (task) => {
    if (!user?.userId || !task?._id) return;
    try {
      await completeTask({ userId: user.userId, taskId: task._id }).unwrap();
      // RTK Query invalidates tags automatically, so completedTasksData will refresh
       // 2️⃣ Pay user $20
      const res = await payUser({ userId: user.userId, amount: 20 }).unwrap();
    

      if (res.success) {
        console.log("🎉 $20 GET successfully!");
      } else {
        console.error("Payment failed:", res.message);
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <p
        className="text-white/80 mb-2"
        style={{
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: "1.4px",
          textTransform: "uppercase",
        }}
      >
        Today's Tasks
      </p>

      {todayTasks.map((task) => (
        <div
          key={task._id}
          style={{ position: "relative", borderRadius: 18, overflow: "hidden" }}
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
                cursor: completedIds.includes(task._id) ? "default" : "pointer",
                opacity: completedIds.includes(task._id) ? 0.5 : 1,
                whiteSpace: "nowrap",
              }}
            >
              {completedIds.includes(task._id) ? "✅ Done" : task.label}
            </button>
          </div>
        </div>
      ))}

      <GlassCard style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span className="text-white/80 font-semibold text-[13px] whitespace-nowrap">
          Daily Progress:{" "}
          {completedIds.filter((id) => todayTasks.some((t) => t._id === id)).length}/
          {todayTasks.length}
        </span>
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              width: `${
                (completedIds.filter((id) =>
                  todayTasks.some((t) => t._id === id)
                ).length /
                  todayTasks.length) *
                100
              }%`,
              background: "linear-gradient(90deg,#facc15,#f97316)",
            }}
          />
        </div>
        <span style={{ fontSize: 16 }}>⭐</span>
      </GlassCard>
    </div>
  );
};

export default Task;