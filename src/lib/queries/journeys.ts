import { ALL_JOURNEYS } from "@/lib/data";
import { ALL_ROLES } from "@/lib/data";
import type { Journey, Role } from "@/lib/types";

export function getAllRoles(): readonly Role[] {
  return ALL_ROLES;
}

export function getRoleById(roleId: string): Role | undefined {
  return ALL_ROLES.find((r) => r.id === roleId);
}

export function getJourneyByRole(roleId: string): Journey | undefined {
  return ALL_JOURNEYS.find((j) => j.roleId === roleId);
}

export function getAllJourneys(): readonly Journey[] {
  return ALL_JOURNEYS;
}
