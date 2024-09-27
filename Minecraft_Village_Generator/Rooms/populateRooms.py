from mcpi import block
from mcpi.minecraft import Minecraft
import random

def populateRooms(mc, x, y, z, length, height, width):
    
    bookshelf = random.randint(1,4)
    blocks = [
        block.GLOWING_OBSIDIAN.id,
        235, # White glazed teracotta
        236, # Orange glazed teracotta
        block.CRAFTING_TABLE.id, # Crafting table
        116, # Enchanting table
        120, # End portal frame
        25, # Note block
        block.GLOWSTONE_BLOCK.id, # Glowstone
        98, # Chiseled stone bricks
        133, # Block of emerald
        152, # Block of redstone
        block.AIR.id,
        block.AIR.id,
        block.AIR.id
    ]

    if bookshelf == 1 or bookshelf == 2:
        # Layout 1
        if bookshelf == 1:
            # Bookshelf front wall
            for i in range(1, width - 1):
                mc.setBlock(x + length - 2, y, z + i, block.BOOKSHELF.id)
            # Back wall
            for i in range(1, width - 1):
                mc.setBlock(x + 1, y, z + i, blocks[random.randint(0,len(blocks) - 1)])

        # Layout 2
        else:
            # Bookshelf back wall
            for i in range(1, width - 1):
                mc.setBlock(x + 1, y, z + i, block.BOOKSHELF.id)
            # Front wall
            for i in range(1, width - 1):
                mc.setBlock(x + length - 2, y, z + i, blocks[random.randint(0,len(blocks) - 1)])

        # Left wall
        for i in range(1, length - 1):
            mc.setBlock(x + i, y, z + 1, blocks[random.randint(0,len(blocks) - 1)])
        # Right wall
        for i in range(1, length - 1):
                mc.setBlock(x + i, y, z + width - 2, blocks[random.randint(0,len(blocks) - 1)])

    else:
        # Layout 3
        if bookshelf == 3:
            # Bookshelf left wall
            for i in range(1,length - 1):
                mc.setBlock(x + i, y, z + 1, block.BOOKSHELF.id)
            # Right wall
            for i in range(1, length - 1):
                mc.setBlock(x + i, y, z + width - 2, blocks[random.randint(0,len(blocks) - 1)])

        # Layout 4
        else:
            # Bookshelf right wall
            for i in range(1, length - 1):
                mc.setBlock(x + i, y, z + width - 2, block.BOOKSHELF.id)
            # Left wall
            for i in range(1,length - 1):
                mc.setBlock(x + i, y, z + 1, blocks[random.randint(0,len(blocks) - 1)])
            
        # Front wall
            for i in range(1, width - 1):
                mc.setBlock(x + length - 2, y, z + i, blocks[random.randint(0,len(blocks) - 1)])
        # Back wall
        for i in range(1, width - 1):
                mc.setBlock(x + 1, y, z + i, blocks[random.randint(0,len(blocks) - 1)])

        

