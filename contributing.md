## Contributing to FAC-Apps :wrench:

Hello there, nice to see you here! First off, thanks for taking the time to contribute! 🎉👍

If you want to build your own applications that connect to the Raspberry Pi and display things on the LED matrix then SSH into the Pi and become a superuser this way:

```terminal
ssh facapps@192.168.2.2
```

You will the be prompted to answer a password, which is: `facapps` guard this with your life. 🔪

You should now see this before you type in any prompts:
```terminal
facapps@facx-machine:~$
```

In order to use the matrix, you have to have **super user** power, which you can achieve by typing in `su`, with the same password as before. Should look something like this:

```terminal
facapps@facx-machine:~$ su
Password:
```

Now! You should see this `root@` before the name of the Pi, which you can now `cd FAC-Hardware`:

```terminal
root@facx-machine:/home/facapps# cd FAC-Hardware

```

You now have full access to the Pi and display!

The API for the display is [rpi-rgb-led-matrix](https://github.com/hzeller/rpi-rgb-led-matrix) by hzeller. The directory can be found in the home folder of the facapps user (where you land if you log in as above) If you want to see how we interacted with the matrix, have a look at the `matrix` branch of this repo and view the file `/src/socket/index.js`.
