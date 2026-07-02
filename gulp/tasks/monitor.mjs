/* eslint-disable n/no-unpublished-import */
// Монитор RAM/CPU процесса Gulp + системные оповещения

'use strict';

import pidusage from 'pidusage';

import { settings } from '../config/settings.mjs';

const PID = process.pid;
const CFG = settings.monitor ?? {};
const MAX_MB = CFG.maxMemoryMB ?? 1500;
const MAX_CPU = CFG.maxCpuPercent ?? 250; // %*сек за интервал
const INTERVAL = CFG.intervalMs ?? 10_000;

// example: gulp --no-monitor
const ENABLED = !process.argv.includes('--no-monitor');

export const monitor = () => {
  if (!ENABLED) return;

  setInterval(async () => {
    try {
      const { memory, cpu } = await pidusage(PID);
      const memMB = Math.round(memory / 1024 / 1024);

      if (memMB > MAX_MB || cpu > MAX_CPU) {
        const msg = `PID ${PID} • RAM ${memMB} MB • CPU ${cpu.toFixed(1)} %`;

        console.log(app.plugins.chalk.bgRed.white(' MONITOR '), msg);

        app.plugins.notifier.notify({
          title: 'Gulp monitor',
          message: `Порог ресурсов превышен\n${msg}`,
          timeout: 4,
        });
      }
    } catch (error) {
      console.warn(`[${app.plugins.chalk.yellow('monitor')}] не удалось получить статистику: ${error.message}`);
    }
  }, INTERVAL);
};
