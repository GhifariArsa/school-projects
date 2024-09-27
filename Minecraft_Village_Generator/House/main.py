from random import randint
from mcpi import minecraft
from mcpi import block
from shawHouse import shawHouse
import random


mc = minecraft.Minecraft.create()

height = 6
width = random.randint(10,20)
length = random.randint(10,30)


x, y, z = mc.player.getPos()


direction = 'px' 

h1 = shawHouse()
h1.genHouse(height, width, length, x, y, z , direction)




    