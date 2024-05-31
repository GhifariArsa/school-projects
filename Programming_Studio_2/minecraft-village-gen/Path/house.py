from turtle import width
from mcpi import block
from mcpi import minecraft
from mcpi.minecraft import Minecraft
import random
import math
from mcpi import vec3

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

def genRooms(mc, x, y, z, length, height, width, count):
        # base case
        if length <= 8 or width <= 8:
                # TODO 
                populateRooms(mc, x, y, z, length, height, width)
                return

        # width is longer or equal
        if width >= length:
                mc.setBlocks(x + 1, y, z + (width // 2), x + length - 2, y + height - 1, z + (width // 2), block.COBBLESTONE.id)

                # randomise whether to create room or not
                # option = random.randint(1,2)
                # if count != 0 and option == 2:
                #         # TODO 
                #         populateRooms(mc, x, y, z, length, height, width)
                #         return
                
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
                if count != 0 and mc.getBlock(x + length - 1, y + 1, z + (width // 2)) == block.GLASS.id:
                        mc.setBlocks(x + length - 2, y, z + (width // 2) - 1, x + length - 3, y + 2, z + (width // 2) + 1, block.AIR.id)
                else:
                        mc.setBlocks(x + 1, y, z + (width // 2) - 1, x + 2, y + 2, z + (width // 2) + 1, block.AIR.id)
                if count == 0:
                        mc.setBlocks(x + length - 2, y, z + (width // 2) - 1, x + length - 3, y + 2, z + (width // 2) + 1, block.AIR.id)
        
        # length is longer
        else:
                mc.setBlocks(x + (length // 2), y, z + 1, x + (length // 2), y + height - 1, z + width - 2, block.COBBLESTONE.id)
                
                # randomise whether to create room or not
                # option = random.randint(1,2)
                # if count != 0 and option == 2:
                #         # TODO 
                #         populateRooms(mc, x, y, z, length, height, width)
                #         return 
                
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
                if count != 0 and mc.getBlock(x + (length // 2), y + 1, z + width - 1) == block.GLASS.id:
                        mc.setBlocks(x + (length // 2) - 1, y, z + width - 2, x + (length // 2) + 1, y + 2, z + width - 3, block.AIR.id)   
                else:
                        mc.setBlocks(x + (length // 2) - 1, y, z + 1, x + (length // 2) + 1, y + 2, z + 2, block.AIR.id)
                if count == 0:
                        mc.setBlocks(x + (length // 2) - 1, y, z + width - 2, x + (length // 2) + 1, y + 2, z + width - 3, block.AIR.id)

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

    


class House:
    def __init__(self,mc,vec3:vec3.Vec3,h_len,h_height,h_wid,dir) -> None:
        self.mc = minecraft.Minecraft.create()
        self.vec3 = vec3
        self.h_len = h_len
        self.h_wid = h_wid
        self.h_height = h_height
        self.dir = dir
        
        x,y,z = self.vec3
        self.Hx = x+1
        self.Hy = y
        self.Hz = z+1

    def buildHouse(self):
        x,y,z = self.vec3
        #foundation
        foun_block = random.choice([(24,0),(45,0),(98,0)])
        self.mc.setBlocks(x+1,y,z+1,x+self.h_len,y,z+self.h_wid,foun_block[0],foun_block[1])
        #body
        #no of floor (ALWAYS 2 FLOORS FOR THIS HOUSE)
        secondFloor = True
        temp_height = 2*self.h_height+2
            
        #body
        House.buildBody(self,secondFloor)

        # Windows
            #1st floor
        genWindows(self.mc, x + 1, y + 1, z + 1, self.h_len, self.h_wid)
            #2nd floor
        genWindows(self.mc, x + 1, y + self.h_height+2, z + 1, self.h_len, self.h_wid)

        #stairs
        genStairs(self.mc, x + 1, y + 1, z + 1, self.h_wid)

        #door and slab
        House.buildDoorAndSlab(self,foun_block)

        # roof
        self.h_height = temp_height
        House.buildRoof(self,foun_block)
 

        

        
        

    def buildDoorAndSlab(self,foun_block):
        x,y,z = self.vec3
        dir = self.dir
        len = self.h_len    #x
        wid = self.h_wid    #z

        if dir =='px':
            #door
            door_z_pos = z+self.h_wid -1
            door_x_pos = x+1
            self.mc.setBlock(door_x_pos,y+2,door_z_pos,64,8)
            self.mc.setBlock(door_x_pos,y+1,door_z_pos,64,0)
            #clear blocks behind door
            self.mc.setBlocks(door_x_pos+1,y+1,door_z_pos,door_x_pos+3,y+1,door_z_pos,0)
            
            #slab            
            door_slabID = None
            if foun_block[0] == 24:
                door_slabID = (44,1)
            elif foun_block[0] == 45:
                door_slabID = (44,4)
            else:
                door_slabID = (44,5)
            self.mc.setBlock(door_x_pos-1,y,door_z_pos,door_slabID[0],door_slabID[1])
            #slabs connect to path
            self.mc.setBlocks(door_x_pos-1,y-1,door_z_pos,door_x_pos-3,y-1,door_z_pos-(wid//2),208)

        elif dir =='nx':
            #door
            door_z_pos = z+2
            door_x_pos = x+len
            self.mc.setBlock(door_x_pos,y+2,door_z_pos,64,8)
            self.mc.setBlock(door_x_pos,y+1,door_z_pos,64,0)
            #clear blocks behind door
            self.mc.setBlocks(door_x_pos-1,y+1,door_z_pos,door_x_pos-3,y+1,door_z_pos,0)
            
            #slab            
            door_slabID = None
            if foun_block[0] == 24:
                door_slabID = (44,1)
            elif foun_block[0] == 45:
                door_slabID = (44,4)
            else:
                door_slabID = (44,5)
            self.mc.setBlock(door_x_pos+1,y,door_z_pos,door_slabID[0],door_slabID[1])
            #slabs connect to path
            self.mc.setBlocks(door_x_pos+1,y-1,door_z_pos,door_x_pos+3,y-1,door_z_pos+(wid//2),208)

        elif dir =='pz':
            #door
            door_z_pos = z+1
            door_x_pos = x+len-1
            self.mc.setBlock(door_x_pos,y+2,door_z_pos,64,8)
            self.mc.setBlock(door_x_pos,y+1,door_z_pos,64,0)
            #clear blocks behind door
            self.mc.setBlocks(door_x_pos,y+1,door_z_pos+1,door_x_pos,y+1,door_z_pos+3,block.AIR)
            
            #slab            
            door_slabID = None
            if foun_block[0] == 24:
                door_slabID = (44,1)
            elif foun_block[0] == 45:
                door_slabID = (44,4)
            else:
                door_slabID = (44,5)

            self.mc.setBlock(door_x_pos,y,door_z_pos-1,door_slabID[0],door_slabID[1])
            #connect slab to path
            self.mc.setBlocks(door_x_pos,y-1,door_z_pos-1,door_x_pos-(len//2),y-1,door_z_pos-3,208)

        elif dir =='nz':
            #door
            door_z_pos = z+wid
            door_x_pos = x+len-1
            self.mc.setBlock(door_x_pos,y+2,door_z_pos,64,8)
            self.mc.setBlock(door_x_pos,y+1,door_z_pos,64,0)
            #clear blocks behind door
            self.mc.setBlocks(door_x_pos,y+1,door_z_pos-1,door_x_pos,y+1,door_z_pos-3,0)
            
            #slab            
            door_slabID = None
            if foun_block[0] == 24:
                door_slabID = (44,1)
            elif foun_block[0] == 45:
                door_slabID = (44,4)
            else:
                door_slabID = (44,5)
            self.mc.setBlock(door_x_pos,y,door_z_pos+1,door_slabID[0],door_slabID[1])
            #slabs connect to path
            self.mc.setBlocks(door_x_pos,y-1,door_z_pos+1,door_x_pos-(len//2),y-1,door_z_pos+3,208)



        
    # def createPool(self):
    #     vec3T = self.vec3
    #     Hx = self.Hx
    #     Hy = self.Hy
    #     Hz = self.Hz

    #     pool_len = self.h_len//2 
    #     pool_wid = self.h_wid//2 
        
    #     #top
    #     self.mc.setBlocks(Hx-2,Hy-1,Hz+1,Hx-2-pool_len,Hy-1,Hz+pool_wid,155,0)
    #     #bottom
    #     self.mc.setBlocks(Hx-2-1,Hy-2,Hz+1+1,Hx-2-pool_len+1,Hy-2,Hz+pool_wid-1,155,0)
    #     #water
    #     self.mc.setBlocks(Hx-2-1,Hy-1,Hz+1+1,Hx-2-pool_len+1,Hy-1,Hz+pool_wid-1,block.WATER_STATIONARY.id)
    
    def buildBody(self,secondFloor:bool):
        x,y,z = self.vec3
        body_block = random.choice([(5,0),(5,1),(5,2),(5,3)])
        #TODO testing with glass blocks
        # body_block = (block.GLASS.id,0)
        self.mc.setBlocks(x+1,y+1,z+1,x+self.h_len,y+self.h_height,z+self.h_wid,body_block[0],body_block[1])
        #hollowarea in body 
        self.mc.setBlocks(x+2,y+1,z+2,x+self.h_len-1,y+self.h_height,z+self.h_wid-1,block.AIR.id)

        #gen rooms
        vec = self.vec3
        # self.mc.setBlock(vec.x+1,vec.y+1,vec.z+1,block.GOLD_BLOCK.id)
        genRooms(self.mc,vec.x+1,vec.y+1,vec.z+1,self.h_len,self.h_height,self.h_wid,0)

        #windows
        # genWindows(self.mc, x + 1, y + 1, z + 1, self.h_len, self.h_wid)


        #second floor
        if secondFloor:
            # body_block = (95,7)
                #body
            self.mc.setBlocks(x+1,y+self.h_height+1,z+1,x+self.h_len,y+(2*self.h_height)+1,z+self.h_wid,body_block[0],body_block[1])
                #hollowarea in body 
            self.mc.setBlocks(x+2,y+self.h_height+2,z+2,x+self.h_len-1,y+(2*self.h_height)+1,z+self.h_wid-1,block.AIR.id)
                #rooms
            # self.mc.setBlock(x+1,y+self.h_height+2,z+1,block.GOLD_BLOCK.id)
            genRooms(self.mc,x+1,y+self.h_height+2,z+1,self.h_len,self.h_height,self.h_wid,0)

        




    def buildRoof(self,foun_block):
        x,y,z = self.vec3
        minVal=min(self.h_len,self.h_wid)
        roof_max_height = math.ceil((minVal+2)/2)
        roof_height = random.randint(2,roof_max_height)
        for i in range(roof_height):
            if math.fabs((x+i) - x-i+self.h_len+1) ==2 or math.fabs((z+i)-(z-i+self.h_wid+1))==2:
                break

            self.mc.setBlocks(x+i,y+i+self.h_height,z+i,x-i+self.h_len+1,y+i+self.h_height,z-i+self.h_wid+1,foun_block[0],foun_block[1])





