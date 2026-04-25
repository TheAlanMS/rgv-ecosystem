import { z } from "zod/v4";

export const JourneyStepSchema = z.object({
  base: z.string().min(1),
  label: z.string().min(1),
  pillars: z.tuple([z.number().int().min(1).max(10), z.number().int().min(1).max(10)]),
  strategy: z.string().min(1),
});

export type JourneyStep = z.infer<typeof JourneyStepSchema>;

export const JourneySchema = z.object({
  roleId: z.string().min(1),
  title: z.string().min(1),
  steps: z.tuple([JourneyStepSchema, JourneyStepSchema, JourneyStepSchema, JourneyStepSchema]),
});

export type Journey = z.infer<typeof JourneySchema>;
