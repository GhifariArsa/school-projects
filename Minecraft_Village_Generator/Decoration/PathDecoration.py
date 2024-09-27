from mcpi.minecraft import Minecraft
from mcpi import block
#from picraft
import random

class PathDecoration:
    def __init__(self, mc):
        self.mc = mc
    
    def createLampPost(self, x, y, z):
        # base
        self.mc.setBlocks(x, y, z - 1, x, y, z + 1, block.GRASS.id)
        self.mc.setBlocks(x - 1, y, z, x + 1, y, z, block.GRASS.id)
        self.mc.setBlock(x, y, z, block.COBBLESTONE.id)

        # flowers
        self.mc.setBlock(x, y + 1, z + 1, 38)
        self.mc.setBlock(x, y + 1, z - 1, 38)
        self.mc.setBlock(x + 1, y + 1, z, 38)
        self.mc.setBlock(x - 1, y + 1, z, 38)

        # glowstone
        self.mc.setBlock(x, y + 1, z, block.GLOWSTONE_BLOCK.id)
        self.mc.setBlock(x, y + 2, z, block.GLOWSTONE_BLOCK.id)
        self.mc.setBlock(x, y + 3, z, block.GLOWSTONE_BLOCK.id)
        self.mc.setBlock(x, y + 4, z, block.GLOWSTONE_BLOCK.id)
        self.mc.setBlock(x, y + 5, z, block.GLOWSTONE_BLOCK.id)
        self.mc.setBlock(x + 1, y + 5, z, block.GLOWSTONE_BLOCK.id)
        self.mc.setBlock(x - 1, y + 5, z, block.GLOWSTONE_BLOCK.id)
        self.mc.setBlock(x, y + 5, z + 1, block.GLOWSTONE_BLOCK.id)
        self.mc.setBlock(x, y + 5, z - 1, block.GLOWSTONE_BLOCK.id)
        self.mc.setBlock(x, y + 6, z, block.GLOWSTONE_BLOCK.id)
        
        # cobblestone 
        self.mc.setBlock(x, y + 1, z, block.COBBLESTONE.id)
        self.mc.setBlock(x, y + 2, z, block.COBBLESTONE.id)
        self.mc.setBlock(x, y + 3, z, block.COBBLESTONE.id)
        self.mc.setBlock(x, y + 4, z, block.COBBLESTONE.id)
        self.mc.setBlock(x, y + 5, z, block.COBBLESTONE.id)
    
    def createWell(self, x, y, z):
        # cobblestone base and walls
        self.mc.setBlocks(x - 1, y, z - 1, x + 1, y + 1, z + 1, block.COBBLESTONE.id)
        self.mc.setBlock(x, y + 1, z, block.AIR.id)
        self.mc.setBlock(x, y + 1, z, block.WATER_FLOWING.id)

        # stair blocks
        # 0 positive x
        # 1 negative x
        # 2 positive z
        # 3 negative z
        self.mc.setBlock(x - 2, y, z, block.STAIRS_COBBLESTONE.id, 0)
        self.mc.setBlock(x + 2, y, z, block.STAIRS_COBBLESTONE.id, 1)
        self.mc.setBlock(x, y, z - 2, block.STAIRS_COBBLESTONE.id, 2)
        self.mc.setBlock(x, y, z + 2, block.STAIRS_COBBLESTONE.id, 3)

        # wood frame
        self.mc.setBlock(x - 1, y + 2, z - 1, 85)
        self.mc.setBlock(x - 1, y + 3, z - 1, 85)

        self.mc.setBlock(x - 1, y + 2, z + 1, 85)
        self.mc.setBlock(x - 1, y + 3, z + 1, 85)

        self.mc.setBlock(x + 1, y + 2, z - 1, 85)
        self.mc.setBlock(x + 1, y + 3, z - 1, 85)

        self.mc.setBlock(x + 1, y + 2, z + 1, 85)
        self.mc.setBlock(x + 1, y + 3, z + 1, 85)

        # wood roof
        self.mc.setBlocks(x - 1, y + 4, z - 1, x + 1, y + 4, z + 1, 44, 2)
        self.mc.setBlock(x, y + 4, z, 44, 10)
    
    def createFlowerBed(self, x, y, z):
        # soil
        self.mc.setBlocks(x - 1, y, z - 1, x + 1, y, z + 1, block.GRASS.id)

        # steps
        self.mc.setBlocks(x - 2, y, z - 1, x - 2,  y, z + 1, block.STAIRS_COBBLESTONE.id, 0)
        self.mc.setBlocks(x + 2, y, z - 1, x + 2, y, z + 1, block.STAIRS_COBBLESTONE.id, 1)
        self.mc.setBlocks(x - 1, y, z - 2, x + 1, y, z - 2, block.STAIRS_COBBLESTONE.id, 2)
        self.mc.setBlocks(x - 1, y, z + 2, x + 1, y, z + 2, block.STAIRS_COBBLESTONE.id, 3)

        # flowers
        flowers = [
            block.FLOWER_CYAN.id,
            block.FLOWER_YELLOW.id,
        ]
        flower = random.randint(0,len(flowers) - 1)
        self.mc.setBlocks(x - 1, y + 1, z - 1, x + 1, y + 1, z + 1, flowers[flower])
    
    def createWaterFountain(self, x, y, z):

        # base
        self.mc.setBlocks(x - 3, y, z - 3, x + 3, y, z + 3, block.COBBLESTONE.id)
        self.mc.setBlocks(x - 2, y, z - 2, x + 2, y, z + 2, block.AIR.id)

        self.mc.setBlock(x - 2, y, z - 2, block.COBBLESTONE.id)
        self.mc.setBlock(x - 2, y, z + 2, block.COBBLESTONE.id)
        self.mc.setBlock(x + 2, y, z - 2, block.COBBLESTONE.id)
        self.mc.setBlock(x + 2, y, z + 2, block.COBBLESTONE.id)

        self.mc.setBlock(x - 3, y, z - 3, block.AIR.id)
        self.mc.setBlock(x - 3, y, z + 3, block.AIR.id)
        self.mc.setBlock(x + 3, y, z - 3, block.AIR.id)
        self.mc.setBlock(x + 3, y, z + 3, block.AIR.id)

        # middle pillar
        self.mc.setBlocks(x, y, z, x, y + 6, z, block.COBBLESTONE.id)

        # middle feature
        self.mc.setBlocks(x - 1, y + 5, z - 1, x + 1, y + 5, z + 1, block.COBBLESTONE.id)

        self.mc.setBlock(x - 2, y + 5, z, block.COBBLESTONE.id)
        self.mc.setBlock(x + 2, y + 5, z, block.COBBLESTONE.id)
        self.mc.setBlock(x, y + 5, z - 2, block.COBBLESTONE.id)
        self.mc.setBlock(x, y + 5, z + 2, block.COBBLESTONE.id)

        self.mc.setBlock(x - 2, y + 6, z, block.STAIRS_COBBLESTONE.id, 0)
        self.mc.setBlock(x + 2, y + 6, z, block.STAIRS_COBBLESTONE.id, 1)
        self.mc.setBlock(x, y + 6, z - 2, block.STAIRS_COBBLESTONE.id, 2)
        self.mc.setBlock(x, y + 6, z + 2, block.STAIRS_COBBLESTONE.id, 3)

        # water
        self.mc.setBlock(x, y + 8, z, block.WATER_FLOWING.id)

mc = Minecraft.create()

decoration = PathDecoration(mc)


x, y, z = mc.player.getTilePos()
#x,y,z = -23,65,-755

# clearing
#mc.setBlocks(x - 5, y, z - 5, x + 5, y + 5, z + 5, block.AIR.id)

decoration.createLampPost(x,y,z)
# decoration.createLampPost(x,y,z)
# decoration.createWell(x,y,z)

#x, y, z = mc.player.getTilePos()

# # clearing
# mc.setBlocks(x - 5, y, z - 5, x + 5, y + 5, z + 5, block.AIR.id)

