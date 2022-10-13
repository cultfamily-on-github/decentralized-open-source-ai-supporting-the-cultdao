apt update -y && apt upgrade -y 

# still some parts are done via NodeJS
apt install npm 
npm i -g pm2
npm i -g ts-node
npm i -g typescript

# Deno is my favorite off-chain RTE for such use cases
apt install unzip -y 
curl -fsSL https://deno.land/x/install/install.sh | sh
mv /root/.deno/bin/deno /usr/bin/

# https / ssl certificates are handled via https://certbot.eff.org/instructions?ws=other&os=ubuntufocal
apt-get update
apt-get install snapd
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot certonly --standalone # follow the instructions given there // cultbeast.org www.cultbeast.org 

# renewal details see ./renew-certs.sh file
