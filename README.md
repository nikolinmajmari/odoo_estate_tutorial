# Make current user to execute docker without sudo, 

```
What worked for me was :-

sudo chmod 777 /var/run/docker.sock

sudo usermod -a -G docker <Your_User_Name>
```