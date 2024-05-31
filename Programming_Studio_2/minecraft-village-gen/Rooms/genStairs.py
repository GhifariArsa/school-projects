from symbol import arith_expr
from mcpi import block
from mcpi.minecraft import Minecraft
import random

def genStairs(mc, x, y, z, width):
    
    # Check which side door is
    # Left side
    if mc.getBlock(x, y + 1, z + 1) == block.DOOR_WOOD.id:
        # Non-stair blocks
        mc.setBlocks(x + 1, y, z + width - 2, x + 2, y + 1, z + width - 2, block.WOOD_PLANKS.id)
        mc.setBlock(x + 2, y + 2, z + width - 2, block.WOOD_PLANKS.id)
        mc.setBlock(x + 1, y, z + width - 3, block.WOOD_PLANKS.id)

        # clear entrance for stairs
        mc.setBlocks(x + 2, y + 5, z + width - 4, x + 1, y + 6, z + width - 2, block.AIR.id)

        # Stair blocks
        # 0 positive x
        # 1 negative x
        # 2 positive z
        # 3 negative z
        mc.setBlock(x + 2, y, z + width - 3, block.STAIRS_WOOD.id, 1)
        mc.setBlock(x + 1, y + 1, z + width - 3, block.STAIRS_WOOD.id, 1)
        mc.setBlock(x + 1, y + 2, z + width - 2, block.STAIRS_WOOD.id, 2)
        mc.setBlock(x + 2, y + 3, z + width - 2, block.STAIRS_WOOD.id, 3)
        mc.setBlock(x + 2, y + 4, z + width - 3, block.STAIRS_WOOD.id, 3)
        mc.setBlock(x + 2, y + 5, z + width - 4, block.STAIRS_WOOD.id, 3)

        
    
    # Right side
    else:
        # Non-stair blocks
        mc.setBlocks(x + 2, y, z + 1, x + 2, y + 2, z + 1, block.WOOD_PLANKS.id)
        mc.setBlock(x + 1, y, z + 2, block.WOOD_PLANKS.id)
        mc.setBlock(x + 1, y + 1, z + 1, block.WOOD_PLANKS.id)

        # clear entrance for stairs
        mc.setBlocks(x + 2, y + 5, z + 3, x + 1, y + 6, z + 1, block.AIR.id)

        # Stair blocks
        # 0 positive x
        # 1 negative x
        # 2 positive z
        # 3 negative z
        mc.setBlock(x + 2, y, z + 2, block.STAIRS_WOOD.id, 1)
        mc.setBlock(x + 1, y + 1, z + 2, block.STAIRS_WOOD.id, 1)
        mc.setBlock(x + 1, y + 2, z + 1, block.STAIRS_WOOD.id, 3)
        mc.setBlock(x + 2, y + 3, z + 1, block.STAIRS_WOOD.id, 2)
        mc.setBlock(x + 2, y + 4, z + 2, block.STAIRS_WOOD.id, 2)
        mc.setBlock(x + 2, y + 5, z + 3, block.STAIRS_WOOD.id, 2)
