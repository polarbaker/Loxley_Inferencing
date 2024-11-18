## Notes on how to connect to a server

curl https://pkg.cloudflareclient.com/pubkey.gpg | sudo gpg --yes --dearmor --output /usr/share/keyrings/cloudflare-warp-archive-keyring.gpg

echo "deb [arch=amd64 signed-by=/usr/share/keyrings/cloudflare-warp-archive-keyring.gpg]
https://pkg.cloudflareclient.com/ $(lsb_release -cs) main" | sudo tee
/etc/apt/sources.list.d/cloudflare-client.list

sudo apt-get update && sudo apt-get install cloudflare-warp


ssh -p 15679 root@80.188.223.202 -L 8080:localhost:8080

sudo apt update
sudo apt install unzip -y
