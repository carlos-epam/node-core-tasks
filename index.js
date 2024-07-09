const {exec} = require("child_process");
const fs = require("fs");
const os = require("os");

const LOG_FILE = "activityMonitor.log";
const UPDATE_INTERVAL = 100;
const LOG_INTERVAL = 60000;

function getCommand(){
    if(process.platform === "win32"){
        return 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"';
    }else{
        return 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
    }
}

function formatOutput(orginalOutput){

    if(process.platform === "win32"){
        const [name,cpu,memory] = orginalOutput.split(" ");

        return `${name} ${cpu}% ${(parseInt(memory) / (1024 * 1024)).toFixed(2)}MB`;
    }else{
        const [cpu, memory, name] = orginalOutput.split(/\s+/);

        return `${name} ${cpu}% ${(parseInt(memory) / 1024).toFixed(2)}MB`;
    }
}

function displayInfo(){
    exec(getCommand(), (error, stdout, stderr) => {

        if(error){
            console.error("Error: " + error.message);
        }

        if(stderr){
            console.error("stderr: ", stderr);
            return;
        }

        const formattedOutput = formatOutput(stdout);

        process.stdout.write(`\r${formattedOutput}`);
    });
}

function logActivity() {
    exec(getCommand(), (error, stdout, stderr) => {
      if (error || stderr) return; 
      const formattedOutput = formatOutput(stdout);

      const logEntry = `${Math.floor(Date.now() / 1000)} : ${formattedOutput}\n`;

      console.log("This is running: ", logEntry);
      fs.appendFile(LOG_FILE, logEntry, {flag: 'a'},(err) => {
        if (err) console.error(`Error writing to log: ${err}`);
      });
    });
  }


  function simpleTop(){
    setInterval(displayInfo, UPDATE_INTERVAL);
    setInterval(logActivity, LOG_INTERVAL);
  }

  simpleTop();