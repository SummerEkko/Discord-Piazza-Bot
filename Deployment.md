### Deployment
## Installation
1. `which ansible` - make sure ansible is installed.

2. `ls ~/.ssh/` - make sure you have already generated ssh keys and copied the public key to the server.  
   Since you are our TA or Professor, you should have access to the server, and I suppose you have related knowledge of this course.  
   If not, this link could be helpful: https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys-2  
   Create `config` file in `~/.ssh/` if not exists.
   Put the following content in the file:
    ```
    Host vcl
        HostName 152.7.176.97
        User YourUnityID
   ```
   Please make sure you can **ssh YourUnityID@152.7.176.97 without password**.

3. `ls /etc/ansible/` - make sure you have already created the ansible inventory file.
   You should see the following output:

    ```
    hosts
    ```

   If not, in `/etc` create the folder `ansible` and the file  `hosts`. Put the following content in `hosts`:
    ```
    [vcl]
    152.7.176.97 ansible_connection=ssh ansible_user=YourUnityId ansible_ssh_private_key_file=YourSSHPrivateKeyFile
    ```
4. After above steps, you can run the following command to test the connection:
    ```bash
    ansible vcl -m ping
    ```
   You should see the following output:
    ```
    152.7.176.97 | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
    }
    ```
   If not, please follow the above steps. 

## Deployment
### Clean up the server.  
Since our program is running after this milestone, if you want to run the ansible playbook again, you need to clean up the server first.  
1. ssh to our server.
    ```bash
    ssh 152.7.176.97
    ```
2. stop the program.  
    ```bash
    sudo forever stopall
    ```
3. delete the repo
    ```bash
    sudo rm -rf /home/CSC510-10
    ```
### Run the ansible playbook.  
1. Firstly please copy `config.json` to this project's root folder.
config.json should be like:
    ```json
   {
   "clientId": "",
   "token": "",
   "mongodb": "",
   "piazzaUser": "",
   "piazzaPass": "",
   "piazzaNet": ""
   }
    ```
2. Then run the following command in this project's directory to run the ansible playbook:
   ```bash
   ansible-playbook Deploy.yml
   ```
   You should see the following output:
   ```
   git_user:
   git_password:
   ```
   Please enter your **NCSU GitHub unity id and password** to clone the repo.  
3. Then you should see the following output:
   ```
   PLAY [CSC510-10 - Deployment] **********************************************************************************************************************************************

   TASK [Gathering Facts] *****************************************************************************************************************************************************
   ok: [152.7.176.97]

   TASK [Add nodejs apt key] **************************************************************************************************************************************************
   changed: [152.7.176.97]

   TASK [Add nodejs apt repository] *******************************************************************************************************************************************
   changed: [152.7.176.97]

   TASK [Install nodejs] ******************************************************************************************************************************************************
   changed: [152.7.176.97]

   TASK [Install "forever" node.js package] ***********************************************************************************************************************************
   changed: [152.7.176.97]

   TASK [Install pip3] ********************************************************************************************************************************************************
   changed: [152.7.176.97]

   TASK [Clone CSC510-10] *****************************************************************************************************************************************************
   changed: [152.7.176.97]

   TASK [Install packages based on package.json] ******************************************************************************************************************************
   changed: [152.7.176.97]

   TASK [Install packages based on requirements.txt] **************************************************************************************************************************
   changed: [152.7.176.97]

   TASK [Copy config.json to VCL] *********************************************************************************************************************************************
   changed: [152.7.176.97]

   TASK [Start index.js] ******************************************************************************************************************************************************
   changed: [152.7.176.97]

   TASK [Start main.py] *******************************************************************************************************************************************************
   changed: [152.7.176.97]

   PLAY RECAP *****************************************************************************************************************************************************************
   152.7.176.97               : ok=12   changed=11   unreachable=0    failed=0    skipped=0    rescued=0    ignored=0
   ```
4. Then you can go to our server, Discord server and Piazza to check the running program.  
On VCL server, you can try
   ```bash
   forever list
   ```
   or 
   ```bash
   ps -aux | grep js
   ps -aux | grep py
   ```
   to see the running program.
## Contact
If you have any questions, please contact us.  
[Zhiyuan Ma](mailto:zma24@ncsu.edu)   
[Zijun Lu](mailto:zlu5@ncsu.edu)    
[Rachel Chen](mailto:rschen@ncsu.edu)  
[Kai Gao](mailto:kgao2@ncsu.edu)