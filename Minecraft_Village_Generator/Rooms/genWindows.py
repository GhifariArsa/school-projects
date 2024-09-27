from mcpi import block
from mcpi.minecraft import Minecraft
import random

def genWindows(mc, x, y, z, length, width):

    # Front of house
    option = random.randint(1,3)
    if option == 1:
        mc.setBlocks(x, y + 1, z + (width // 2) - 2, x, y + 2, z + (width // 2) + 2, block.GLASS.id)

    elif option == 2:
        mc.setBlocks(x, y + 1, z + (width // 2)+ 2, x, y + 2, z + (width // 2) + 4, block.GLASS.id)
        mc.setBlocks(x, y + 1, z + (width // 2) - 4, x, y + 2, z + (width // 2) - 2, block.GLASS.id)

    else:
        mc.setBlocks(x, y + 1, z + (width // 2) + 3, x, y + 2, z + (width // 2) + 4, block.GLASS.id)
        mc.setBlocks(x, y + 1, z + (width // 2) - 1, x, y + 2, z + (width // 2) + 1, block.GLASS.id)
        mc.setBlocks(x, y + 1, z + (width // 2) - 4, x, y + 2, z + (width // 2) - 3, block.GLASS.id)

    # # Back of house
    option = random.randint(1,3)
    if option == 1:
        mc.setBlocks(x + length - 1, y + 1, z + (width // 2) - 2, x + length - 1, y + 2, z + (width // 2) + 2, block.GLASS.id)

    elif option == 2:
        mc.setBlocks(x + length - 1, y + 1, z + (width // 2) + 2, x + length - 1, y + 2, z + (width // 2) + 4, block.GLASS.id)
        mc.setBlocks(x + length - 1, y + 1, z + (width // 2) - 4, x + length - 1, y + 2, z + (width // 2) - 2, block.GLASS.id)

    else:
        mc.setBlocks(x + length - 1, y + 1, z + (width // 2) + 3, x + length - 1, y + 2, z + (width // 2) + 4, block.GLASS.id)
        mc.setBlocks(x + length - 1, y + 1, z + (width // 2) - 1, x + length - 1, y + 2, z + (width // 2) + 1, block.GLASS.id)
        mc.setBlocks(x + length - 1, y + 1, z + (width // 2) - 4, x + length - 1, y + 2, z + (width // 2) - 3, block.GLASS.id)

    # Left of house
    option = random.randint(1,3)
    if option == 1:
        mc.setBlocks(x + (length // 2) - 2, y + 1, z, x + (length // 2) + 2, y + 2, z, block.GLASS.id)

    elif option == 2:
        mc.setBlocks(x + (length // 2) + 2, y + 1, z, x + (length // 2) + 4, y + 2, z, block.GLASS.id)
        mc.setBlocks(x + (length // 2) - 4, y + 1, z, x + (length // 2) - 2, y + 2, z, block.GLASS.id)

    else:
        mc.setBlocks(x + (length // 2) + 3, y + 1, z, x + (length // 2) + 4, y + 2, z, block.GLASS.id)
        mc.setBlocks(x + (length // 2) - 1, y + 1, z, x + (length // 2) + 1, y + 2, z, block.GLASS.id)
        mc.setBlocks(x + (length // 2) - 4, y + 1, z, x + (length // 2) - 3, y + 2, z, block.GLASS.id)

    # Right of house
    option = random.randint(1,3)
    if option == 1:
        mc.setBlocks(x + (length // 2) - 2, y + 1, z + width - 1, x + (length // 2) + 2, y + 2, z + width - 1, block.GLASS.id)
    
    elif option == 2:
        mc.setBlocks(x + (length // 2) + 2, y + 1, z + width - 1, x + (length // 2) + 4, y + 2, z + width - 1, block.GLASS.id)
        mc.setBlocks(x + (length // 2) - 4, y + 1, z + width - 1, x + (length // 2) - 2, y + 2, z + width - 1, block.GLASS.id)

    else:
        mc.setBlocks(x + (length // 2) + 3, y + 1, z + width - 1, x + (length // 2) + 4, y + 2, z + width - 1, block.GLASS.id)
        mc.setBlocks(x + (length // 2) - 1, y + 1, z + width - 1, x + (length // 2) + 1, y + 2, z + width - 1, block.GLASS.id)
        mc.setBlocks(x + (length // 2) - 4, y + 1, z + width - 1, x + (length // 2) - 3, y + 2, z + width - 1, block.GLASS.id)