import { Protocol } from "../enums/protocol.enum.ts";
import type { SettingsData } from "../types/settingsData";

export const defaultSettingsData: SettingsData = {
  protocol: Protocol.http,
  ip: "localhost",
  port: "8080",
  interval: 10000,
};
