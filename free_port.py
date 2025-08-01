import psutil

def find_process_on_port(port):
    for proc in psutil.process_iter():
        try:
            for conn in proc.connections():
                if conn.laddr.port == port:
                    print(f"PID: {proc.pid}, Name: {proc.name()}")
                    return proc.pid
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            continue
    return None

pid = find_process_on_port(8501)
if pid:
    print(f"Process {pid} is using port 8501")
else:
    print("No process found using port 8501")
