// Завдання 4
// Напишіть скрипт, який отримує з командного рядка числовий параметр – частоту в секундах.
// Скрипт має виводити на кожному тику (визначеному частотою) наступну системну інформацію:

// - operating system;
// - architecture;
// - current user name;
// - cpu cores models;
// - cpu temperature;
// - graphic controllers vendors and models;
// - total memory, used memory, free memory в GB;
// - дані про батарею (charging, percent, remaining time).

// Знайдіть і використайте функціональність підходящих модулів.

// Після внесення змін треба зробити команду npm run build а щоб запустити код npm run task4 <к-ть секунд>

import si from "systeminformation";
import os from "os";

const args = process.argv.slice(2);
const frequency = parseInt(args[0]);

async function printOS(): Promise<string> {
  const data = await si.osInfo();
  return `Operating System: ${data.platform}`;
}

async function printArchitecture(): Promise<string> {
  const data = await si.osInfo();
  return `Architecture: ${data.arch}`;
}

async function printUserName(): Promise<string> {
  const data = await si.osInfo();
  return `Current User Name: ${data.hostname}`;
}

async function printCpuCores(): Promise<string> {
  const data = os.cpus();
  let result = "";
  for (let i = 0; i < data.length; i++) {
    result += `- Core ${i + 1}: ${data[i].model}\n`;
  }
  return result;
}

async function printCpuTemperature(): Promise<string> {
  const data = await si.cpuTemperature();
  return `CPU Temperature: ${!data.main ? "not supported" : data.main}`;
}

async function printGraphicsControllers(): Promise<string> {
  const data = (await si.graphics()).controllers;
  let result = `Graphic Controllers Vendors and Models:\n`;
  for (let i = 0; i < data.length; i++) {
    result += `- ${data[i].model}\n`;
  }
  return result;
}

async function printMemoryUsage(): Promise<string> {
  const data = await si.mem();
  const totalMemory = data.total / 1024 ** 3;
  const freeMemory = data.free / 1024 ** 3;
  const usedMemory = totalMemory - freeMemory;
  return `Total Memory: ${totalMemory.toFixed(
    2
  )} GB\nUsed Memory: ${usedMemory.toFixed(
    2
  )} GB\nFree Memory: ${freeMemory.toFixed(2)} GB`;
}

async function printBatteryStatus(): Promise<string> {
  const data = await si.battery();
  return `Battery Status: ${
    data.isCharging ? "Charging" : "Not Charging"
  }\nBattery Percent: ${data.percent}%\nBattery Time Remaining: ${
    data.isCharging ? "infinite" : data.timeRemaining
  } minutes`;
}

const printFunctions: string[] = await Promise.all([
  printOS(),
  printArchitecture(),
  printUserName(),
  printCpuCores(),
  printCpuTemperature(),
  printGraphicsControllers(),
  printMemoryUsage(),
  printBatteryStatus(),
]);

if (frequency) {
  console.log(printFunctions[0]);

  let index = 1;
  const i = setInterval(async () => {
    console.log(printFunctions[index++]);
    if (index >= printFunctions.length) {
      clearInterval(i);
    }
  }, frequency * 1000);
} else {
  console.log("Frequence must be an integer number");
}
