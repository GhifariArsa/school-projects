from mcpi import block
from mcpi.minecraft import Minecraft
import random
import math
from genRooms import *
from genStairs import *
from populateRooms import *
from genWindows import *
class House:
    def __init__(self, mc):
        self.mc = mc
    
    def genHouse(self, x, y, z):
        # Clearing
        mc.setBlocks(x + 1, y, z + 1, x + 30, y + 20, z + 30, block.AIR.id)

        # House dimensions (non random for testing)
        #length = 15
        #height = 5
        #width = 15

        # House dimensions (random)
        length = random.randint(15,25)
        height = 5
        width = random.randint(15,25)

        x2 = x + length
        y2 = y + height
        z2 = z + width

        ax1 = x + 2
        ay1 = y + 1
        az1 = z + 2
        ax2 = x2 - 1
        ay2 = y2 - 1
        az2 = z2 - 1

        # House outline storey 1
        self.mc.setBlocks(x + 1, y, z + 1, x2, y2, z2, block.WOOD_PLANKS.id)
        self.mc.setBlocks(ax1, ay1, az1, ax2, ay2+1, az2, block.AIR.id)

        # Flooring storey 1
        self.mc.setBlocks(x + 1, y, z + 1, x2, y, z2, block.COBBLESTONE.id)

        # # Entrance
        
        # Windows
        genWindows(mc, x + 1, y + 1, z + 1, length, width)

        # Generate rooms
        genRooms(mc, x + 1, y + 1, z + 1, length, height, width, 0)

        # # # House outline storey 2
        # self.mc.setBlocks(x + 1, y + 6, z + 1, x2, y2 + 6, z2, block.WOOD_PLANKS.id)
        # self.mc.setBlocks(ax1, ay1 + 6, az1, ax2, ay2+7, az2, block.AIR.id)

        # # # Flooring storey 2
        # self.mc.setBlocks(x + 2, y + 6, z + 2, x2 - 1, y + 6, z2 - 1, block.GLASS.id)
        # #self.mc.setBlocks(x + 2, y + 6, z2 - 3, x + 3, y + 6, z2 - 1, block.AIR.id)

        

        # # # Windows
        # genWindows(mc, x + 1, y + 7, z + 1, length, width)

        # # # Generate rooms storey 2
        # genRooms(mc, x + 1, y + 7, z + 1, length, height, width, 0)

        # # Generate stairs
        # genStairs(mc, x + 1, y + 1, z + 1, width)





mc = Minecraft.create()

x, y, z = mc.player.getTilePos()

home = House(mc)
home.genHouse(x, y, z)

# Clearing
#mc.setBlocks(x + 1, y, z + 1, x + 30, y + 30, z + 30, block.AIR.id)