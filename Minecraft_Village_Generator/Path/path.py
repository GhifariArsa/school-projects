from mcpi import block
from mcpi import minecraft
import random
import math
from mcpi import vec3
import utility
import picraft
# from main import heights_FQ_dict_main


class Path:
    def __init__(self,vecEnd:vec3.Vec3,heights_FQ_dict:dict,type) -> None:
        self.mc = minecraft.Minecraft.create()
        self.mcpiWord = picraft.World()
        self.vecEnd = vecEnd
        self.endVec = None
        self.heights_FQ_dict = heights_FQ_dict
        self.type = type
        # self.blockID = (97,4)
        self.blockID = (208,0)
        
    def gen_px(self,len,wid):
        x,y,z = self.vecEnd
        # print(self.heights_FQ_dict)
        for i in range(len):
            if self.type =='main':
                randNum = random.randint(1,4)
            else:
                randNum = random.randint(1,2)

            if randNum ==1:
                offset = random.choice([-1,1])
            else:
                offset = 0

            for j in range(wid):
                # y = self.mc.getHeight(x+1+i,z+j)
                check_tuple=(int(x+1+i),int(z+j))
                y =self.heights_FQ_dict[check_tuple]

                self.mc.setBlock(x+1+i,y,z+j+offset,self.blockID[0],self.blockID[1])

        #make endVec 
        endX = x+len
        endY = y
        endZ = z+(wid/2)
        self.endVec = vec3.Vec3(endX,endY,endZ)

    def gen_nx(self,len,wid):
        x,y,z = self.vecEnd
        for i in range(len):
            if self.type =='main':
                randNum = random.randint(1,4)
            else:
                randNum = random.randint(1,2)

            if randNum ==1:
                offset = random.choice([-1,1])
            else:
                offset = 0
            for j in range(wid):
                # y = self.mc.getHeight(x-1-i,z+j)
                check_tuple=(x-1-i,z+j)
                y =self.heights_FQ_dict[check_tuple]
                self.mc.setBlock(x-1-i,y,z+j+offset,self.blockID[0],self.blockID[1])

        #make endVec 
        endX = x-len
        endY = y
        endZ = z+(wid/2)
        self.endVec = vec3.Vec3(endX,endY,endZ) 
        

    def gen_pz(self,len,wid):

        x,y,z = self.vecEnd
        x =int(x)
        y =int(y)
        z =int(z)
        for i in range(len):
            if self.type =='main':
                randNum = random.randint(1,4)
            else:
                randNum = random.randint(1,2)

            if randNum ==1:
                offset = random.choice([-1,1])
            else:
                offset = 0
            for j in range(wid):
                check_tuple=(x+j,z+i+1)
                y =self.heights_FQ_dict[check_tuple]                        
                    
                self.mc.setBlock(x+j+offset,y,z+i+1,self.blockID[0],self.blockID[1])
                # print('COMES HERE!')

                
        
        #make endVec 
        endX = x+(wid/2)
        endY = y
        endZ = z+len
        self.endVec = vec3.Vec3(endX,endY,endZ)
    
    def gen_nz(self,len,wid):
        x,y,z = self.vecEnd
        for i in range(len):
            if self.type =='main':
                randNum = random.randint(1,4)
            else:
                randNum = random.randint(1,2)

            if randNum ==1:
                offset = random.choice([-1,1])
            else:
                offset = 0
            for j in range(wid):
                # y = self.mc.getHeight(x+j,z-i-1)
                check_tuple=(x+j,z-i-1)
                y =self.heights_FQ_dict[check_tuple]
                self.mc.setBlock(x+j+offset,y,z-i-1,self.blockID[0],self.blockID[1])
        
        #make endVec 
        endX = x+(wid/2)
        endY = y
        endZ = z-len
        self.endVec = vec3.Vec3(endX,endY,endZ)
        



        


        
    

