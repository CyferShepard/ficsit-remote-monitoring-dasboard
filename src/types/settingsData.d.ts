import type { Protocol } from "../enums/protocol.enum.ts";

export type SettingsData = {
  protocol: Protocol;
  ip: string;
  port: string;
  interval: number;
};
