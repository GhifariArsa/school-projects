import random
from mcpi import block

class House:
    def __init__(self, mc):
        self.mc = mc
        
    def buildHouse(self, x, y, z):
        houseHeight = 4
        x2 = x + random.randint(6,12)
        y2 = y + houseHeight
        z2 = z + random.randint(8,12)
        airX1 = x + 2
        airY1 = y + 1
        airZ1 = z + 2
        airX2 = x2 - 1
        airY2 = y2 - 1
        airZ2 = z2 - 1

        
        # Creating the outline of the house
        self.mc.setBlocks(x+1, y, z+1, x2, y2, z2, block.WOOD_PLANKS)
        self.mc.setBlocks(airX1, airY1, airZ1, airX2, airY2, airZ2, block.AIR)
        
        # Finding the middle secttion for the door
        houseLength = abs(self.changeNegative(x) - self.changeNegative(x2))
        houseWidth = abs(self.changeNegative(z) - self.changeNegative(z2))
        print(houseLength)
        print(houseWidth)
        
        # Creating the doorway
        if houseLength % 2 == 0:
            self.mc.setBlock(x + (houseLength // 2), y+1, z+1 ,block.AIR)
            self.mc.setBlock(x + (houseLength // 2), y+2, z+1 ,block.AIR)
            self.mc.setBlock(x + 1 + (houseLength // 2), y+1, z+1 ,block.AIR)
            self.mc.setBlock(x + 1 + (houseLength // 2), y+2, z+1 ,block.AIR)
        else:
            self.mc.setBlock(x + 1 + (houseLength // 2), y+1, z+1 ,block.AIR)
            self.mc.setBlock(x + 1 + (houseLength // 2), y+2, z+1 ,block.AIR)
            
        # Changing the corner of the house with textured blocks
        self.mc.setBlocks(x+1, y, z+1, x+1, y + houseHeight, z+1, block.WOOD.id)
        self.mc.setBlocks(x + houseLength, y, z + 1, x + houseLength, y + houseHeight, z + 1, block.WOOD.id)
        self.mc.setBlocks(x2, y, z2, x2, y + houseHeight, z2, block.WOOD.id)
        self.mc.setBlocks(x2 + 1 - houseLength, y, z2, x2 + 1 - houseLength, y + houseHeight, z2, block.WOOD.id)
        
        # Changing the Floor to Stone
        self.mc.setBlocks(x+1, y, z+1, x2, y, z2, block.COBBLESTONE)
        
        # Adding the Roof
        
        
        
    def changeNegative(self, num):
        if num < 0:
            gang = -num
            return num
        else:
            return num
            
    
        
        
        
        