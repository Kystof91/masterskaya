#!/usr/bin/env python3
import subprocess
import sys
import time

def run_command(command, description):
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {description} завершено успешно")
            return True
        else:
            print(f"❌ Ошибка при {description.lower()}: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Исключение при {description.lower()}: {e}")
        return False

def main():
    print("🚀 Начинаем развертывание на VPS сервер...")
    
    # Шаг 1: Создание архива
    if not run_command(
        "tar -czf medical-center.tar.gz --exclude=node_modules --exclude=.git --exclude=.next .",
        "Создание архива проекта"
    ):
        sys.exit(1)
    
    # Шаг 2: Копирование на сервер
    if not run_command(
        "scp medical-center.tar.gz root@89.111.170.219:/var/www/medical-center/",
        "Копирование файлов на сервер"
    ):
        sys.exit(1)
    
    # Шаг 3: Выполнение команд на сервере
    server_commands = [
        "cd /var/www/medical-center",
        "tar -xzf medical-center.tar.gz",
        "rm medical-center.tar.gz",
        "npm install",
        "npm run build",
        "mkdir -p logs",
        "pm2 stop medical-center-app 2>/dev/null || true",
        "pm2 delete medical-center-app 2>/dev/null || true",
        "pm2 start ecosystem.config.js --env production",
        "pm2 save",
        "pm2 startup"
    ]
    
    print("🔄 Выполнение команд на сервере...")
    for cmd in server_commands:
        if not run_command(
            f'ssh root@89.111.170.219 "{cmd}"',
            f"Выполнение: {cmd}"
        ):
            print(f"❌ Ошибка при выполнении команды: {cmd}")
            break
    
    # Шаг 4: Настройка файрвола
    firewall_commands = [
        "ufw allow 3000",
        "ufw allow 80",
        "ufw allow 443"
    ]
    
    print("🔄 Настройка файрвола...")
    for cmd in firewall_commands:
        run_command(
            f'ssh root@89.111.170.219 "{cmd}"',
            f"Настройка файрвола: {cmd}"
        )
    
    # Шаг 5: Очистка
    run_command("rm medical-center.tar.gz", "Удаление локального архива")
    
    print("🎉 Развертывание завершено!")
    print("🌐 Приложение доступно по адресу: http://89.111.170.219:3000")

if __name__ == "__main__":
    main()
