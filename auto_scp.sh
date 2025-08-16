#!/usr/bin/expect -f

set timeout 30
set archive "medical-center.tar.gz"
set server "root@89.111.170.219"
set remote_path "/var/www/medical-center/"

spawn scp $archive $server:$remote_path
expect {
    "password:" {
        send "FJKH8wQwpBOobw1T\r"
        expect eof
    }
    eof {
        puts "Файл скопирован успешно"
    }
    timeout {
        puts "Таймаут при копировании"
        exit 1
    }
}
