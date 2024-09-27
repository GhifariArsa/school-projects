from mcpi import block
from mcpi.minecraft import Minecraft
import random
from populateRooms import *

def genRooms(mc, x, y, z, length, height, width, count):
        # base case
        if length <= 9 or width <= 9:
                populateRooms(mc, x, y, z, length, height, width)
                return

        # width is longer or equal
        if width >= length:
                mc.setBlocks(x + 1, y, z + (width // 2), x + length - 2, y + height - 1, z + (width // 2), block.COBBLESTONE.id)
                
                # even width
                if width % 2 == 0:
                        # right side
                        genRooms(mc, x, y, z + (width // 2), length, height, (width // 2), count + 1)
                        # left side
                        genRooms(mc, x, y, z, length, height, (width // 2) + 1, count + 1)
                
                # odd width
                else:
                        # right side
                        genRooms(mc, x, y, z + (width // 2), length, height, (width // 2) + 1, count + 1)
                        # left side
                        genRooms(mc, x, y, z, length, height, (width // 2) + 1, count + 1)

                # doorway
                # check for window
                if count != 0 and mc.getBlock(x + length - 1, y + 1, z + (width // 2)) == block.GLASS.id:
                        mc.setBlocks(x + length - 2, y, z + (width // 2) - 2, x + length - 3, y + 2, z + (width // 2) + 2, block.AIR.id)
                else:
                        mc.setBlocks(x + 1, y, z + (width // 2) - 2, x + 2, y + 2, z + (width // 2) + 2, block.AIR.id)
                # if first division, create another doorway on other end
                if count == 0:
                        mc.setBlocks(x + length - 2, y, z + (width // 2) - 2, x + length - 3, y + 2, z + (width // 2) + 2, block.AIR.id)
        
        # length is longer
        else:
                mc.setBlocks(x + (length // 2), y, z + 1, x + (length // 2), y + height - 1, z + width - 2, block.COBBLESTONE.id)
                
                # even length
                if length % 2 == 0:
                        # top side
                        genRooms(mc, x + (length // 2), y, z, length // 2, height, width, count + 1)
                        # bottom side
                        genRooms(mc, x, y, z, (length // 2) + 1, height, width, count + 1)

                # odd length
                else:
                        # top side
                        genRooms(mc, x + (length // 2), y, z, (length // 2) + 1, height, width, count + 1)
                        # bottom side
                        genRooms(mc, x, y, z, (length // 2) + 1, height, width, count + 1)

                # doorway
                # check for window
                if count != 0 and mc.getBlock(x + (length // 2), y + 1, z + width - 1) == block.GLASS.id:
                        mc.setBlocks(x + (length // 2) - 2, y, z + width - 2, x + (length // 2) + 2, y + 2, z + width - 3, block.AIR.id)   
                else:
                        mc.setBlocks(x + (length // 2) - 2, y, z + 1, x + (length // 2) + 2, y + 2, z + 2, block.AIR.id)
                # if first division, create another doorway on other end
                if count == 0:
                        mc.setBlocks(x + (length // 2) - 2, y, z + width - 2, x + (length // 2) + 2, y + 2, z + width - 3, block.AIR.id)
