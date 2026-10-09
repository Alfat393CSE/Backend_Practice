export const UserRoleEnum = {
  ADMIN: "admin",
  PROJECT_MANAGER: "project_manager",
  MEMBER: "member",
};

export const AvailableUserRole = Object.values(UserRoleEnum);

export const TaskStatusEnum = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};

export const AvailableTaskStatus = Object.values(TaskStatusEnum);
