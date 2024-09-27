from ctypes import util
from pyexpat import ErrorString
import random
from typing import final
import utility
from mcpi import block
from mcpi.minecraft import Minecraft

class Terraform:
    def __init__(self, mc, world):
        self.mc = mc
        self.world = world
        
    
    def doTerraform(self, x:int, y:int, z:int, length:int, width:int, height:int,forRoad=False,type='None'):
        """Function used to terraform the sorrounding area of a platform to create a more natural look

        Args:
            x (int): X tile coordinate
            y (int): Y tile coordinate
            z (int): Z tile coordinate
            length (int): Length of the platform
            width (int): Width of the platform
            height (int): Height of the platform
            forRoad (bool, optional): Determines if the terraforming is used for the road or not. If it is equate to True else it defaults to False.
        """
        # Determining the size of the land
        # SIZE = 100
        xSize = length #x axis
        zSize = width  #z axis
        sumHeight = 0
        blocksScanned = 0
        averageHeight = height
        coordinates = []
        
        
        for i in range(xSize):
            for j in range(zSize):
                coordinates.append((x + i, z + j))
                blocksScanned += 1
        
        response = utility.query_blocks(self.world.connection, coordinates, "world.getHeight(%d,%d)", int)
        for height in response:
            sumHeight += height[1]
                
        # if mainRoad:
        #     # print('Sum height = ', sumHeight)
        #     averageHeight = sumHeight / blocksScanned
        #     print('Average height =', averageHeight)
        #     averageHeight = round(averageHeight)
        
        # print('Blocks scanned =', blocksScanned)
        
        # Clearing the plot of land based on the average height
        self.mc.setBlocks(x, averageHeight + 1, z, x + xSize, 256, z + zSize - 1, block.AIR.id)
        self.mc.setBlocks(x, averageHeight, z, x + xSize, averageHeight - 50, z + zSize - 1, block.GRASS.id)
       

        # print('-'*5,'DONE!','-'*5,sep='')
        
        # Starting the terraforming
        # print('-'*5,'Starting Blur!','-'*5,sep='')
        self.startBlur(x, y, z, xSize, zSize,forRoad)

                
    def startBlur(self, x, y, z, xSize, zSize,forRoad):
        erosionRange = 20
        
        xValue = x - erosionRange
        zValue = z - erosionRange
        # coordinateList = list of coordinates for where the blur starts and end
        coordinateList = []
        # kernelList = list of coordinates for mathematical blur calculation
        kernelList = []
        
        # Appending the coordinates 
        for i in range(xSize + (erosionRange*2)):
            for j in range(zSize + (erosionRange*2)):
                coordinateList.append((xValue + i, zValue + j))
                
        # kernelRange = kernel block range (+ 2 on each side)
        for i in range(xSize + (erosionRange*2) + 4):
            for j in range(zSize + (erosionRange*2) + 4):
                kernelList.append((xValue + i - 2, zValue + j - 2))
                

        # Getting the height of each block for original coordinates
        response = utility.query_blocks(self.world.connection, coordinateList, "world.getHeight(%d,%d)", int)
        responseDict = {}
        blockList = []
        for blocks, height in response:
            responseDict[blocks] = height
            # Block list for getting the top most block id
            blockList.append((blocks[0], height, blocks[1]))
        
            
        
        # Getting the height of each block for kernel range
        responseKernel = {}
        kernelHeight = utility.query_blocks(self.world.connection, kernelList, "world.getHeight(%d,%d)", int)
        for blocks, height in kernelHeight:
            responseKernel[blocks] = height
        
        # print('calculating kernel')
        finalHeight = self.kernelCalculation(responseKernel, responseDict)
        
        # Getting the block id of the top most block of the erosion
        responseBlockID = utility.query_blocks(self.world.connection, blockList, "world.getBlockWithData(%d,%d,%d)", lambda ans: tuple(map(int, ans.split(","))))
        responseBlockIDDict = {}
        for blocks, item in responseBlockID:
            responseBlockIDDict[(blocks[0], blocks[2])] = item
        
        for key, item in finalHeight.items():
            self.mc.setBlocks(key[0], item, key[1], key[0], item - 10, key[1], responseBlockIDDict[(key[0], key[1])][0], responseBlockIDDict[(key[0], key[1])][1])
            self.mc.setBlocks(key[0], item + 1, key[1], key[0], 256, key[1], block.AIR.id)
        
        
    def kernelCalculation(self, kernelHeight, coordinateList):
        """_summary_

        Args:
            kernelHeight (dict): _description_
            coordinateList (dict): _description_
            xValue (int): _description_
            zValue (int): _description_
            erosionRange (int): _description_

        Returns:
            Dict: Returns the updated height values for each block after the gaussian blur
        """
        response = {}
        kernel=[[1,4,7,4,1],
                [4,16,26,16,4],
                [7,26,41,26,7],
                [4,16,26,16,4],
                [1,4,7,4,1]]
        KERNEL_TOTAL = 273
        
        
        for key, item in coordinateList.items():
            total = 0
            average = 0
            pixel_kernel = [[kernelHeight[(key[0] - 2, key[1] + 2)],kernelHeight[(key[0] - 1, key[1] + 2)],kernelHeight[(key[0] + 0, key[1] + 2)],kernelHeight[(key[0] + 1, key[1] + 2)],kernelHeight[(key[0] + 2, key[1] + 2)]],
                            [kernelHeight[(key[0] - 2, key[1] + 1)],kernelHeight[(key[0] - 1, key[1] + 1)],kernelHeight[(key[0] + 0, key[1] + 1)],kernelHeight[(key[0] + 1, key[1] + 1)],kernelHeight[(key[0] + 2, key[1] + 1)]],
                            [kernelHeight[(key[0] - 2, key[1] - 0)],kernelHeight[(key[0] - 1, key[1] - 0)],item,kernelHeight[(key[0] + 1, key[1] - 0)],kernelHeight[(key[0] + 2, key[1] - 0)]],
                            [kernelHeight[(key[0] - 2, key[1] - 1)],kernelHeight[(key[0] - 1, key[1] - 1)],kernelHeight[(key[0] - 0, key[1] - 1)],kernelHeight[(key[0] + 1, key[1] - 1)],kernelHeight[(key[0] + 2, key[1] - 1)]],
                            [kernelHeight[(key[0] - 2, key[1] - 2)],kernelHeight[(key[0] - 1, key[1] - 2)],kernelHeight[(key[0] - 0, key[1] - 2)],kernelHeight[(key[0] + 1, key[1] - 2)],kernelHeight[(key[0] + 2, key[1] - 2)]]]
            
            for i in range(5):
                for j in range(5):
                    total += kernel[i][j] * pixel_kernel[i][j]
            
            average = total / KERNEL_TOTAL
            average = round(average)
            
            response[key] = average
        return response
        
        
        