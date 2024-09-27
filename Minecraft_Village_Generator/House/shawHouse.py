from mcpi.minecraft import Minecraft
from mcpi import block
import random
import math


class shawHouse:
    def __init__(self):
        mc = Minecraft.create()
        x, y, z = mc.player.getPos()
    
    def genHouse(self, height,width, length, x, y ,z, direction):
        
        a=[1, 4, 5, 17, 22, 24, 41, 42, 45, 57, 133, 155, 162, 168, 179, 201, 214, 216, 229]
        aa=random.choice(a)
        matt=aa
        
        mc = Minecraft.create()
        
        num_floor = [1,2,2,2,2,2]
        floor = random.choice(num_floor)

        if floor == 2:
            height = height + 6

        x=x+1
        mc.setBlocks(x, y, z, x+length, y+height, z+width, aa)    
        #mc.setBlocks(x, y+1, z, x+9, y+5, z+7, block.GLASS.id)
        mc.setBlocks(x+1, y+1, z+1,x+length-1, y+height-1, z+width-1, block.AIR.id)
        #mc.setBlock(x, y+1, z+3, block.AIR.id)
        #mc.setBlock(x, y+2, z+3, block.AIR.id)
        
        

        #mc.setBlock(x, y+2, z+3, 64, 8)
        #mc.setBlock(x, y+1, z+3, 64, 5)
        #mc.setBlock(x, y+2, z+4, 64, 9)
        #mc.setBlock(x, y+1, z+4, 64, 0)
        
        
        for i in range(length):
            for j in range(width):
                mc.setBlock(x+i,y+6,z+j, aa) 


        randroof = [2,3,4,5,6]
        roof = random.choice(randroof)

        # if(roof == 1):
        #     for i in range(0,10): #roof
        #         mc.setBlock(x+i,  y, z+8, 251)
        #         mc.setBlock(x+i,  y+1, z+8, 251)
        #         mc.setBlock(x+i,  y+2, z+8, 251)
        #         mc.setBlock(x+i,  y+3, z+8, 251)
        #         mc.setBlock(x+i,  y+4, z+8, 251)
        #         mc.setBlock(x+i,  y+5, z+8, 251)
        #         mc.setBlock(x+i,  y+6, z+8, 251)
        #         mc.setBlock(x+i,  y+7, z+8, 251)
        #         mc.setBlock(x+i,  y+7, z+7, 251)
        #         mc.setBlock(x+i,  y+7, z+6, 251)
        #         mc.setBlock(x+i,  y+7, z+5, 251)
        #         mc.setBlock(x+i,  y+7, z+4, 251)
        #         mc.setBlock(x+i,  y+7, z+3, 251)
        #         mc.setBlock(x+i,  y+7, z+2, 251)
        #         mc.setBlock(x+i,  y+7, z+1, 251)
        #         mc.setBlock(x+i,  y+7, z, 251)
        #         mc.setBlock(x+i,  y+7, z-1, 251)
        #         mc.setBlock(x+i,  y+7, z-2, 251)
        
        
        
        if( roof == 2 or roof == 3 or roof == 4 or roof == 5 or roof == 6):
            
            height = height

            width = width+1
            length = length-1
            minVal = min(height,width)
            roof_max_height = math.ceil((minVal+2)/2)
            roof_height = random.randint(2,roof_max_height)
            a=[1, 4, 5, 17, 22, 24, 41, 42, 45, 57, 133, 155, 162, 168, 179, 201, 214, 216, 229]
            aa=random.choice(a)
            z=z-1
            for i in range(roof_height):
                if math.fabs((x+i) - x-i+height+1) ==2 or math.fabs((z+i)-(z-i+width+1))==2:
                    break
            
                
                mc.setBlocks(x+i,y+i+height,z+i,x-i+length+1,y+i+height,z-i+width+1,aa)

        if floor == 2:
            height = height -5
                

        

        length = length +1
        width=width-1
        hy=length
        wy=width
        xz=0
        yz=0
        dub=0

        num_flr = 1
        
        x_wall_1 = shawHouse.splitHouse(self, height,length, width, matt, hy, xz, x , y , z, num_flr)
        shawHouse.zsplitHouse(self, height, length, width, matt, wy, yz, dub, x, y, z, x_wall_1, num_flr, direction)

        if floor == 2:
            num_flr=2
            x_wall_2 = shawHouse.splitHouse(self, height,length, width, matt, hy, xz, x , y+ 5, z, num_flr)
            shawHouse.zsplitHouse(self, height, length, width, matt, wy, yz, dub, x, y+5, z, x_wall_2, num_flr, direction)

             

    def splitHouse(self, height, length, width, aa, hy, xz, x , y, z, floor):

        split=length//2
        
        if hy>19:
            split1=split-1
            split2=split-2
            split3=split+1
            split4=split+2
            rand_length = [split, split1, split2, split3, split4]

        
        if hy==16:
            
            rand_length = [split]
            # print(split)
        else:
           # split1=split-1  
           # split3=split+1
           # rand_length = [split, split1, split3]

            rand_length = [split]
            # print(split)
        
        wall_pos = random.choice(rand_length)
        x_wall_1 = wall_pos
        mc = Minecraft.create()
        
        if floor==2:
                y=y+1 
        if xz==1:
            for i in range(width-7):
                mc.setBlock(x+x_wall_1+1,y+1,z+5+i, 140)
                mc.setBlock(x+x_wall_1+1,y+2,z+5+i, 140)
                
                mc.setBlock(x+x_wall_1+1,y+3,z+5+i, 50)

        if xz==0:
            for i in range(width-7):
                mc.setBlock(x+x_wall_1+1,y,z+5+i, 2)
                if floor ==1:
                    mc.setBlock(x+x_wall_1+1,y+1,z+5+i, 175, 5)
                    

                if floor ==2:
                    mc.setBlock(x+x_wall_1+1,y+1,z+5+i, 175, 4)
                      
                
                mc.setBlock(x+x_wall_1+1,y+3,z+5+i, 50)
                mc.setBlock(x+x_wall_1-1,y+3,z+5+i, 50, 2)        
            
        if floor==2:
                y=y-1
        
        if xz==1:
            if floor==2:
                y=y+1 
            for i in range(width-7):
                mc.setBlock(x+x_wall_1-1,y+1,z+5+i, 47)
                mc.setBlock(x+x_wall_1-1,y+2,z+5+i, 47)
                mc.setBlock(x+x_wall_1-1,y+3,z+5+i, 47)
            
            if floor==2:
                y=y-1 

                

        for i in range(height):
            for j in range(width):
                mc.setBlock(x+wall_pos, y+1+i, z+j+1, aa)
        

        
        if floor==1: 
            mc.setBlock(x+wall_pos, y+2,z+3, 64, 8)
            mc.setBlock(x+wall_pos, y+1,z+3, 64, 5)
            
            mc.setBlock(x+wall_pos, y+2,z+4, 64, 9)
            mc.setBlock(x+wall_pos, y+1,z+4, 64, 0)
            
            mc.setBlock(x+wall_pos, y+3,z+3, block.GLASS.id)
            mc.setBlock(x+wall_pos, y+3,z+4, block.GLASS.id )
            
            mc.setBlock(x+wall_pos+1, y+3,z+3, 50, 1)
            mc.setBlock(x+wall_pos-1, y+3,z+3, 50, 2)
            
            mc.setBlock(x+wall_pos+1, y+3,z+4, 50, 1)
            mc.setBlock(x+wall_pos-1, y+3,z+4, 50, 2)

            mc.setBlock(x+wall_pos, y+2,z+width - 2, 64, 8)
            mc.setBlock(x+wall_pos, y+1,z+width - 2, 64, 5)
            
            mc.setBlock(x+wall_pos, y+2,z+width -1, 64, 9)
            mc.setBlock(x+wall_pos, y+1,z+width -1, 64, 0)
            
            mc.setBlock(x+wall_pos, y+3,z+width - 2, block.GLASS.id)
            mc.setBlock(x+wall_pos, y+3,z+width - 1, block.GLASS.id )

            mc.setBlock(x+wall_pos+1, y+3,z+width - 2, 50, 1)
            mc.setBlock(x+wall_pos-1, y+3,z+width - 2, 50, 2)
            
            mc.setBlock(x+wall_pos+1, y+3,z+width -1, 50, 1)
            mc.setBlock(x+wall_pos-1, y+3,z+width -1, 50, 2)

            for i in range(width-3):
                mc.setBlock(x+hy, y+2,z+i+3, block.GLASS.id)
                mc.setBlock(x+hy, y+3,z+i+3, block.GLASS.id)
                mc.setBlock(x+hy, y+4,z+i+3, block.GLASS.id)

            
            bedside_blocks= [ 473, 25, 33, 54, 58, 84, 130, 138, 137,218 ]
            bedside = random.choice(bedside_blocks)
  
            mc.setBlock(x+hy-1, y+1,z+2, bedside)
            mc.setBlock(x+hy-1, y+1,z+3, 26, 11)
            mc.setBlock(x+hy-2, y+1,z+3, 26, 3) 
            mc.setBlock(x+hy-1, y+1,z+4, 26, 11)
            mc.setBlock(x+hy-2, y+1,z+4, 26, 3) 
            
            mc.setBlock(x+hy-1, y+1,z+5, bedside)
            
            bedside = random.choice(bedside_blocks)

            mc.setBlock(x+hy-1, y+1,z+width, bedside)
            mc.setBlock(x+hy-1, y+1,z+width-1, 26, 11)
            mc.setBlock(x+hy-2, y+1,z+width-1, 26, 3) 
            mc.setBlock(x+hy-1, y+1,z+width-2, 26, 11)
            mc.setBlock(x+hy-2, y+1,z+width-2, 26, 3) 
            mc.setBlock(x+hy-1, y+1,z+width-3, bedside) 

            
            
                  

        if floor==2:
            y=y+1
            mc.setBlock(x+wall_pos, y+2,z+3, 64, 8)
            mc.setBlock(x+wall_pos, y+1,z+3, 64, 5)
            
            mc.setBlock(x+wall_pos, y+2,z+4, 64, 9)
            mc.setBlock(x+wall_pos, y+1,z+4, 64, 0)
            
            mc.setBlock(x+wall_pos, y+3,z+3, block.GLASS.id)
            mc.setBlock(x+wall_pos, y+3,z+4, block.GLASS.id )
            
            mc.setBlock(x+wall_pos+1, y+3,z+3, 50, 1)
            mc.setBlock(x+wall_pos-1, y+3,z+3, 50, 2)
            
            mc.setBlock(x+wall_pos+1, y+3,z+4, 50, 1)
            mc.setBlock(x+wall_pos-1, y+3,z+4, 50, 2)

            mc.setBlock(x+wall_pos, y+2,z+width - 2, 64, 8)
            mc.setBlock(x+wall_pos, y+1,z+width - 2, 64, 5)
            
            mc.setBlock(x+wall_pos, y+2,z+width -1, 64, 9)
            mc.setBlock(x+wall_pos, y+1,z+width -1, 64, 0)
            
            mc.setBlock(x+wall_pos, y+3,z+width - 2, block.GLASS.id)
            mc.setBlock(x+wall_pos, y+3,z+width - 1, block.GLASS.id )

            mc.setBlock(x+wall_pos+1, y+3,z+width - 2, 50, 1)
            mc.setBlock(x+wall_pos-1, y+3,z+width - 2, 50, 2)
            
            mc.setBlock(x+wall_pos+1, y+3,z+width -1, 50, 1)
            mc.setBlock(x+wall_pos-1, y+3,z+width -1, 50, 2)

            for i in range(width-3):
                mc.setBlock(x+hy, y+2,z+i+3, block.GLASS.id)
                mc.setBlock(x+hy, y+3,z+i+3, block.GLASS.id)
                mc.setBlock(x+hy, y+4,z+i+3, block.GLASS.id)

            for i in range(width-3):
                mc.setBlock(x, y+2,z+i+3, block.GLASS.id)
                mc.setBlock(x, y+3,z+i+3, block.GLASS.id)
                mc.setBlock(x, y+4,z+i+3, block.GLASS.id)    
            
            bedside_blocks= [ 473, 23, 25, 33, 54, 58, 61, 62 , 84, 130, 138, 137,218 ]
            bedside = random.choice(bedside_blocks)
  
            mc.setBlock(x+hy-1, y+1,z+2, bedside)
            mc.setBlock(x+hy-1, y+1,z+3, 26, 11)
            mc.setBlock(x+hy-2, y+1,z+3, 26, 3) 
            mc.setBlock(x+hy-1, y+1,z+4, 26, 11)
            mc.setBlock(x+hy-2, y+1,z+4, 26, 3) 
            
            mc.setBlock(x+hy-1, y+1,z+5, bedside)
            
            bedside = random.choice(bedside_blocks)

            mc.setBlock(x+hy-1, y+1,z+width, bedside)
            mc.setBlock(x+hy-1, y+1,z+width-1, 26, 11)
            mc.setBlock(x+hy-2, y+1,z+width-1, 26, 3) 
            mc.setBlock(x+hy-1, y+1,z+width-2, 26, 11)
            mc.setBlock(x+hy-2, y+1,z+width-2, 26, 3) 
            mc.setBlock(x+hy-1, y+1,z+width-3, bedside)
            y=y-1



        length = length + wall_pos       
        if(hy>wall_pos and length>4 and hy>15 and xz<1):
            xz=xz+1
            shawHouse.splitHouse(self, height, length, width, aa, hy, xz,x,y,z, floor)   
        #else:
         #   for i in range(height):
          #      for j in range(width):
           #         mc.setBlock(x+wall_pos, y+1+i, z+j+1, aa)
        return x_wall_1   


    def zsplitHouse(self, height, length, width, aa, wy, yz, dub, x , y ,z, x_wall_1, floor, direction):
        
    
       
        if yz==0:

            if wy>15:
                zsplit = width //2
                zsplit1=zsplit-1 
                zsplit3=zsplit-2

            else:
                zsplit = width //2
                zsplit1=zsplit 
                zsplit3=zsplit

            if wy<12:
                zsplit = (width //2)+2
                zsplit1=zsplit 
                zsplit3=zsplit  

            
        
        if yz==1:            

            if wy == 15 or wy == 16 :
                zsplit = (width //2)+dub
                zsplit1=zsplit-1 
                zsplit3=zsplit   
            
            if wy == 17:
                zsplit = (width //2)+dub
                zsplit1=zsplit 
                zsplit3=zsplit   


            else:
                zsplit = (width //2)+dub
                zsplit1=zsplit+1 
                zsplit3=zsplit    

        if yz==0:
            act_len = length


        zrand_length = [zsplit, zsplit1, zsplit3]

        zwall_pos = random.choice(zrand_length)
        
        randi_len = [1, 2]
        randlen_ = random.choice(randi_len)

        if randlen_ == 1:
            length = x_wall_1

        if randlen_ == 2:
            length = length     

        
        mc = Minecraft.create()
        
        glass_pane = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
        glass_color = random.choice(glass_pane)
        
        if floor ==1:
            for i in range(wy-zwall_pos): 
                mc.setBlock(x+1, y+4, z+zwall_pos+i+1, 160, glass_color)
                mc.setBlock(x+1, y+3, z+zwall_pos+i+1, 160, glass_color)
    
        if floor ==2:
            y=y+1
        
        mc.setBlock(x+1,y+1, z+2, 138)
        mc.setBlock(x+1,y+1, z+wy, 138)
        

        #156 180 SOFA
        
        sofa_mat=[156, 180, 114]
        sofa= random.choice(sofa_mat)
        
        carpet_color=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]
        car= random.choice(carpet_color)
        
        if yz ==0:
            mc.setBlock(x+2, y+1, z+2, sofa, 1)
            mc.setBlock(x+2, y+1, z+3, sofa, 1)
            for i in range(x_wall_1-4):
                mc.setBlock(x+3+i, y+1, z+2, sofa, 3)

               
            for i in range(x_wall_1-5):    
                mc.setBlock(x+3+i, y+1, z+3, 171, car)
                mc.setBlock(x+3+i, y+1, z+4, 171, car)
                mc.setBlock(x+3+i, y+3, z+2, 50, 3)


            mc.setBlock(x+(3+x_wall_1-4)//2, y+1,z+4, 116)  
            mc.setBlock(x+3+x_wall_1-5, y+1, z+3, sofa ,0)

        sofa_mat=[156, 180, 114]
        sofa= random.choice(sofa_mat)
        
        carpet_color=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]
        car= random.choice(carpet_color)
        
        if yz ==0:
            mc.setBlock(x+2, y+1, z+wy, sofa, 1)
            mc.setBlock(x+2, y+1, z+wy-1, sofa, 1)
            for i in range(x_wall_1-4):
                mc.setBlock(x+3+i, y+1, z+wy, sofa, 2)

               
            for i in range(x_wall_1-5):    
                mc.setBlock(x+3+i, y+1, z+wy-1, 171, car)
                mc.setBlock(x+3+i, y+1, z+wy-2, 171, car)
                mc.setBlock(x+3+i, y+3, z+wy, 50, 4)


            mc.setBlock(x+(3+x_wall_1-4)//2, y+1,z+wy-2, 116)  
            mc.setBlock(x+3+x_wall_1-5, y+1, z+wy-1, sofa ,0)    
          
            
        

        if floor ==2:
            y=y-1

        for i in range(height-1):
            for j in range(length):
                mc.setBlock(x+j+1, y+1+i, z+zwall_pos, aa)

        if floor ==2 and yz==0:
            
            for i in range(6):
                
                mc.setBlock(x+3+i, y-3+i, z+zwall_pos+1, block.AIR.id)
                mc.setBlock(x+3+i, y-2+i, z+zwall_pos+1, block.AIR.id)
                mc.setBlock(x+3+i, y-1+i, z+zwall_pos+1, block.AIR.id)
                mc.setBlock(x+4+i, y-4+i, z+zwall_pos+1, block.STAIRS_COBBLESTONE.id)
                mc.setBlock(x+4+i, y-3+i, z+zwall_pos+1, block.AIR.id)
                mc.setBlock(x+4+i, y-2+i, z+zwall_pos+1, block.AIR.id)
                mc.setBlock(x+4+i, y-1+i, z+zwall_pos+1, block.AIR.id)
                mc.setBlock(x+3+i, y-2+i,z+zwall_pos+1, 50, 3)


        if floor==1:
            mc.setBlock(x+2, y+2,z+zwall_pos, block.AIR.id)
            mc.setBlock(x+2, y+1,z+zwall_pos, block.AIR.id)
            
            mc.setBlock(x+3, y+2,z+zwall_pos, block.AIR.id)
            mc.setBlock(x+3, y+1,z+zwall_pos, block.AIR.id)
            
            mc.setBlock(x+2, y+3,z+zwall_pos, block.GLASS.id)
            mc.setBlock(x+3, y+3,z+zwall_pos, block.GLASS.id )

            mc.setBlock(x+2, y+3,z+zwall_pos+1, 50, 3)
            mc.setBlock(x+2, y+3,z+zwall_pos-1, 50, 4)
            
            mc.setBlock(x+3, y+3,z+zwall_pos+1, 50, 3)
            mc.setBlock(x+3, y+3,z+zwall_pos-1, 50, 4)
            

            mc.setBlock(x+length - 2 , y+2,z+zwall_pos , block.AIR.id)
            mc.setBlock(x+length - 2, y+1,z+zwall_pos , block.AIR.id)
            
            mc.setBlock(x+length - 3, y+2,z+zwall_pos , block.AIR.id)
            mc.setBlock(x+length - 3, y+1,z+zwall_pos , block.AIR.id)

            mc.setBlock(x+length - 2 , y+3,z+zwall_pos +1, 50,3)
            mc.setBlock(x+length - 3, y+3,z+zwall_pos +1 , 50,3)

            mc.setBlock(x+length - 2 , y+3,z+zwall_pos -1 , 50,4)
            mc.setBlock(x+length - 3, y+3,z+zwall_pos -1, 50,4)
            
            if(wy>(zwall_pos+5) and width>4 and wy>13 and yz<1):
                bedside_blocks= [ 473, 23, 25, 33, 54, 58, 61, 62 , 84, 130, 138, 137, 158, 170,218 ]
                bedside = random.choice(bedside_blocks)

                mc.setBlock(x+act_len - 1, y+1,z+zwall_pos +1 , bedside)
                mc.setBlock(x+act_len - 1, y+1,z+zwall_pos +2 , 26, 11)
                mc.setBlock(x+act_len - 2, y+1,z+zwall_pos+2 , 26,3)
                mc.setBlock(x+act_len - 1, y+1,z+zwall_pos+3 , bedside)
                
            

            

            

        if floor==2:
            y=y+1
            mc.setBlock(x+2, y+2,z+zwall_pos, block.AIR.id)
            mc.setBlock(x+2, y+1,z+zwall_pos, block.AIR.id)
            
            mc.setBlock(x+3, y+2,z+zwall_pos, block.AIR.id)
            mc.setBlock(x+3, y+1,z+zwall_pos, block.AIR.id)
            
            mc.setBlock(x+2, y+3,z+zwall_pos, block.GLASS.id)
            mc.setBlock(x+3, y+3,z+zwall_pos, block.GLASS.id )

            mc.setBlock(x+2, y+3,z+zwall_pos+1, 50, 3)
            mc.setBlock(x+2, y+3,z+zwall_pos-1, 50, 4)
            
            mc.setBlock(x+3, y+3,z+zwall_pos+1, 50, 3)
            mc.setBlock(x+3, y+3,z+zwall_pos-1, 50, 4)

            

            mc.setBlock(x+length - 2 , y+2,z+zwall_pos , block.AIR.id)
            mc.setBlock(x+length - 2, y+1,z+zwall_pos , block.AIR.id)
            
            mc.setBlock(x+length - 3, y+2,z+zwall_pos , block.AIR.id)
            mc.setBlock(x+length - 3, y+1,z+zwall_pos , block.AIR.id)

            mc.setBlock(x+length - 2 , y+3,z+zwall_pos +1, 50,3)
            mc.setBlock(x+length - 3, y+3,z+zwall_pos +1 , 50,3)

            mc.setBlock(x+length - 2 , y+3,z+zwall_pos -1 , 50,4)
            mc.setBlock(x+length - 3, y+3,z+zwall_pos -1, 50,4)

            if(wy>(zwall_pos+5) and width>4 and wy>13 and yz<1):
                bedside_blocks= [ 473, 23, 25, 33, 54, 58, 61, 62 , 84, 130, 138, 137, 158, 170,218 ]
                bedside = random.choice(bedside_blocks)

                mc.setBlock(x+act_len - 1, y+1,z+zwall_pos +1 , bedside)
                mc.setBlock(x+act_len - 1, y+1,z+zwall_pos +2 , 26, 11)
                mc.setBlock(x+act_len - 2, y+1,z+zwall_pos+2 , 26,3)
                mc.setBlock(x+act_len - 1, y+1,z+zwall_pos+3 , bedside)

            y=y-1

            
            #for i in range(5):    
                #mc.setBlock(x+4+i, y+7, z+1+zwall_pos, block.AIR.id) 

        width = width - zwall_pos
        
        if floor ==2:
            y=y+1
            for i in range(wy-1):
                mc.setBlock(x+11, y+1, z+i+2, 0)
                mc.setBlock(x+11, y+2, z+i+2, 0)
            y=y-1    



        if floor ==2:
            y=y+1
        if yz == 0: #TV

            for i in range(x_wall_1-5):    
                    mc.setBlock(x+3+i, y+3, z+zwall_pos-1, 35, 15)
                    mc.setBlock(x+3+i, y+4, z+zwall_pos-1, 35, 15)
                    mc.setBlock(x+3+i, y+5, z+zwall_pos-1, 50, 4)

        if yz == 1: #TV

            for i in range(x_wall_1-5):    
                    mc.setBlock(x+3+i, y+3, z+zwall_pos+1, 35, 15)
                    mc.setBlock(x+3+i, y+4, z+zwall_pos+1, 35, 15)
                    mc.setBlock(x+3+i, y+5, z+zwall_pos+1, 50, 3)

        if floor ==1:
            if yz==1: #pond
                for i in range(x_wall_1-5):
                    mc.setBlock(x+3+i,y+1,z+zwall_pos-1, 111)
                    mc.setBlock(x+3+i,y,z+zwall_pos-1, 8)
                    mc.setBlock(x+3+i,y-1,z+zwall_pos-1, 20)

                    mc.setBlock(x+3+i,y+1,z+zwall_pos-2, 111)
                    mc.setBlock(x+3+i,y,z+zwall_pos-2, 8)
                    mc.setBlock(x+3+i,y-1,z+zwall_pos-2, 20)
        

                           
                        
            
        if floor ==2:
            y=y-1
        if yz==0 and floor == 1:

            if direction =='px':

                mc.setBlock(x, y+2, z+(wy/2), block.AIR.id)
                mc.setBlock(x, y+1, z+(wy/2), block.AIR.id)
                mc.setBlock(x, y+2, z+(wy/2)+1, block.AIR.id)
                mc.setBlock(x, y+1, z+(wy/2)+1, block.AIR.id)

                mc.setBlock(x+2, y+2, z+(wy/2), block.AIR.id)
                mc.setBlock(x+2, y+1, z+(wy/2), block.AIR.id)
                mc.setBlock(x+2, y+2, z+(wy/2)+1, block.AIR.id)
                mc.setBlock(x+2, y+1, z+(wy/2)+1, block.AIR.id)

                mc.setBlock(x+1, y+2, z+(wy/2), block.AIR.id)
                mc.setBlock(x+1, y+1, z+(wy/2), block.AIR.id)
                mc.setBlock(x+1, y+2, z+(wy/2)+1, block.AIR.id)
                mc.setBlock(x+1, y+1, z+(wy/2)+1, block.AIR.id) 

                #door
                mc.setBlock(x, y+2, z+(wy/2), 64, 8)
                mc.setBlock(x, y+1, z+(wy/2), 64, 5)
                mc.setBlock(x, y+2, z+(wy/2)+1, 64, 9)
                mc.setBlock(x, y+1, z+(wy/2)+1, 64, 0)
                

                mc.setBlock(x-1, y, z+(wy/2), 44, 5)
                mc.setBlock(x-1, y, z+(wy/2)+1, 44, 5) 

                for i in range(1,6): 
                    mc.setBlock(x-i, y-1, z+(wy/2)-3, 2) 
                    mc.setBlock(x-i, y-1, z+(wy/2)-3+1, 2)
                    mc.setBlock(x-i, y-1, z+(wy/2)-3+2, 2)
                    mc.setBlock(x-i, y-1, z+(wy/2)-3+5, 2)
                    mc.setBlock(x-i, y-1, z+(wy/2)-3+6, 2)
                    mc.setBlock(x-i, y-1, z+(wy/2)-3+7, 2)
                    
                    mc.setBlock(x-i, y, z+(wy/2)-3, 37) 
                    mc.setBlock(x-i, y, z+(wy/2)-3+1, 38, 1)
                    mc.setBlock(x-i, y, z+(wy/2)-3+2, 38, 2)
                    mc.setBlock(x-i, y, z+(wy/2)-3+5, 38, 3)
                    mc.setBlock(x-i, y, z+(wy/2)-3+6, 38, 4)
                    mc.setBlock(x-i, y, z+(wy/2)-3+7, 38, 5)
                    mc.setBlock(x-(i+1), y-1, z+(wy/2)-3+3, 208)
                    mc.setBlock(x-(i+1), y-1, z+(wy/2)-3+4, 208)

                 
                

                x=x+1
                z=z+1

                for i in range(0,(act_len+1)):  #pool
                    mc.setBlock(x+(i-1), y-1, z-1, 4)
                    mc.setBlock(x+(i-1), y-1, z-2, 4)
                    mc.setBlock(x+(i-1), y-1, z-3, 4)
                    mc.setBlock(x+(i-1), y-1, z-4, 4)
                    mc.setBlock(x+(i-1), y-1, z-5, 4)
                    mc.setBlock(x+(i-1), y-1, z-6, 4)

                    mc.setBlock(x+(i-1), y-2, z-1, 4)
                    mc.setBlock(x+(i-1), y-2, z-2, 4)
                    mc.setBlock(x+(i-1), y-2, z-3, 4)
                    mc.setBlock(x+(i-1), y-2, z-4, 4)
                    mc.setBlock(x+(i-1), y-2, z-5, 4)
                    mc.setBlock(x+(i-1), y-2, z-6, 4)

                    mc.setBlock(x+(i-1), y-3, z-1, 4)
                    mc.setBlock(x+(i-1), y-3, z-2, 4)
                    mc.setBlock(x+(i-1), y-3, z-3, 4)
                    mc.setBlock(x+(i-1), y-3, z-4, 4)
                    mc.setBlock(x+(i-1), y-3, z-5, 4)
                    mc.setBlock(x+(i-1), y-3, z-6, 4)
                    
                    mc.setBlock(x+(i-1), y, z-1, block.AIR.id)
                    mc.setBlock(x+(i-1), y+0, z-2, 0)
                    mc.setBlock(x+(i-1), y+0, z-3, 0)
                    mc.setBlock(x+(i-1), y+0, z-4, 0)
                    mc.setBlock(x+(i-1), y+0, z-5, 0)
                    mc.setBlock(x+(i-1), y+0, z-6, 0)

                    mc.setBlock(x+(i-1), y+1, z-1, 0)
                    mc.setBlock(x+(i-1), y+1, z-2, 0)
                    mc.setBlock(x+(i-1), y+1, z-3, 0)
                    mc.setBlock(x+(i-1), y+1, z-4, 0)
                    mc.setBlock(x+(i-1), y+1, z-5, 0)
                    mc.setBlock(x+(i-1), y+1, z-6, 0)

                    mc.setBlock(x+(i-1), y+2, z-1, 0)
                    mc.setBlock(x+(i-1), y+2, z-2, 0)
                    mc.setBlock(x+(i-1), y+2, z-3, 0)
                    mc.setBlock(x+(i-1), y+2, z-4, 0)
                    mc.setBlock(x+(i-1), y+2, z-5, 0)
                    mc.setBlock(x+(i-1), y+2, z-6, 0)

                    mc.setBlock(x+(i-1), y+3, z-1, 0)
                    mc.setBlock(x+(i-1), y+3, z-2, 0)
                    mc.setBlock(x+(i-1), y+3, z-3, 0)
                    mc.setBlock(x+(i-1), y+3, z-4, 0)
                    mc.setBlock(x+(i-1), y+3, z-5, 0)
                    mc.setBlock(x+(i-1), y+3, z-6, 0) 

                for i in range(0,act_len-1): #water
                    mc.setBlock(x+i, y-1, z-2, 8)
                    mc.setBlock(x+i, y-2, z-2, 8)

                    mc.setBlock(x+i, y-1, z-3, 8)
                    mc.setBlock(x+i, y-2, z-3, 8)

                    mc.setBlock(x+i, y-1, z-4, 8)
                    mc.setBlock(x+i, y-2, z-4, 8)

                    mc.setBlock(x+i, y-1, z-5, 8)
                    mc.setBlock(x+i, y-2, z-5, 8)        

                x=x-1
                z=z-1
    

            if direction == 'nx':
                

                mc.setBlock(x+act_len, y+2, z+(wy/2), block.AIR.id)
                mc.setBlock(x+act_len, y+1, z+(wy/2), block.AIR.id)
                mc.setBlock(x+act_len, y+2, z+(wy/2)+1, block.AIR.id)
                mc.setBlock(x+act_len, y+1, z+(wy/2)+1, block.AIR.id)

                mc.setBlock(x+act_len-1, y+2, z+(wy/2), block.AIR.id)
                mc.setBlock(x+act_len-1, y+1, z+(wy/2), block.AIR.id)
                mc.setBlock(x+act_len-1, y+2, z+(wy/2)+1, block.AIR.id)
                mc.setBlock(x+act_len-1, y+1, z+(wy/2)+1, block.AIR.id)

                mc.setBlock(x+act_len-2, y+2, z+(wy/2), block.AIR.id)
                mc.setBlock(x+act_len-2, y+1, z+(wy/2), block.AIR.id)
                mc.setBlock(x+act_len-2, y+2, z+(wy/2)+1, block.AIR.id)
                mc.setBlock(x+act_len-2, y+1, z+(wy/2)+1, block.AIR.id)   

                mc.setBlock(x+act_len, y+2, z+(wy/2), 64, 8)
                mc.setBlock(x+act_len, y+1, z+(wy/2), 64, 5)
                mc.setBlock(x+act_len, y+2, z+(wy/2)+1, 64, 9)
                mc.setBlock(x+act_len, y+1, z+(wy/2)+1, 64, 0)
                

                mc.setBlock(x+act_len+1, y, z+(wy/2), 44, 5)
                mc.setBlock(x+act_len+1, y, z+(wy/2)+1, 44, 5) 

                for i in range(1,6): 
                    mc.setBlock(x+i+act_len, y-1, z+(wy/2)-3, 2) 
                    mc.setBlock(x+i+act_len, y-1, z+(wy/2)-3+1, 2)
                    mc.setBlock(x+i+act_len, y-1, z+(wy/2)-3+2, 2)
                    mc.setBlock(x+i+act_len, y-1, z+(wy/2)-3+5, 2)
                    mc.setBlock(x+i+act_len, y-1, z+(wy/2)-3+6, 2)
                    mc.setBlock(x+i+act_len, y-1, z+(wy/2)-3+7, 2)
                    
                    mc.setBlock(x+i+act_len, y, z+(wy/2)-3, 37) 
                    mc.setBlock(x+i+act_len, y, z+(wy/2)-3+1, 38, 1)
                    mc.setBlock(x+i+act_len, y, z+(wy/2)-3+2, 38, 2)
                    mc.setBlock(x+i+act_len, y, z+(wy/2)-3+5, 38, 3)
                    mc.setBlock(x+i+act_len, y, z+(wy/2)-3+6, 38, 4)
                    mc.setBlock(x+i+act_len, y, z+(wy/2)-3+7, 38, 5)
                    mc.setBlock(x+(i+1)+act_len, y-1, z+(wy/2)-3+3, 208)
                    mc.setBlock(x+(i+1)+act_len, y-1, z+(wy/2)-3+4, 208)
                
                x=x+1
                z=z+1

                for i in range(0,(act_len+1)):  #pool
                    mc.setBlock(x+(i-1), y-1, z-1, 4)
                    mc.setBlock(x+(i-1), y-1, z-2, 4)
                    mc.setBlock(x+(i-1), y-1, z-3, 4)
                    mc.setBlock(x+(i-1), y-1, z-4, 4)
                    mc.setBlock(x+(i-1), y-1, z-5, 4)
                    mc.setBlock(x+(i-1), y-1, z-6, 4)

                    mc.setBlock(x+(i-1), y-2, z-1, 4)
                    mc.setBlock(x+(i-1), y-2, z-2, 4)
                    mc.setBlock(x+(i-1), y-2, z-3, 4)
                    mc.setBlock(x+(i-1), y-2, z-4, 4)
                    mc.setBlock(x+(i-1), y-2, z-5, 4)
                    mc.setBlock(x+(i-1), y-2, z-6, 4)

                    mc.setBlock(x+(i-1), y-3, z-1, 4)
                    mc.setBlock(x+(i-1), y-3, z-2, 4)
                    mc.setBlock(x+(i-1), y-3, z-3, 4)
                    mc.setBlock(x+(i-1), y-3, z-4, 4)
                    mc.setBlock(x+(i-1), y-3, z-5, 4)
                    mc.setBlock(x+(i-1), y-3, z-6, 4)

                    mc.setBlock(x+(i-1), y, z-1, block.AIR.id)
                    mc.setBlock(x+(i-1), y+0, z-2, 0)
                    mc.setBlock(x+(i-1), y+0, z-3, 0)
                    mc.setBlock(x+(i-1), y+0, z-4, 0)
                    mc.setBlock(x+(i-1), y+0, z-5, 0)
                    mc.setBlock(x+(i-1), y+0, z-6, 0)

                    mc.setBlock(x+(i-1), y+1, z-1, 0)
                    mc.setBlock(x+(i-1), y+1, z-2, 0)
                    mc.setBlock(x+(i-1), y+1, z-3, 0)
                    mc.setBlock(x+(i-1), y+1, z-4, 0)
                    mc.setBlock(x+(i-1), y+1, z-5, 0)
                    mc.setBlock(x+(i-1), y+1, z-6, 0)

                    mc.setBlock(x+(i-1), y+2, z-1, 0)
                    mc.setBlock(x+(i-1), y+2, z-2, 0)
                    mc.setBlock(x+(i-1), y+2, z-3, 0)
                    mc.setBlock(x+(i-1), y+2, z-4, 0)
                    mc.setBlock(x+(i-1), y+2, z-5, 0)
                    mc.setBlock(x+(i-1), y+2, z-6, 0)

                    mc.setBlock(x+(i-1), y+3, z-1, 0)
                    mc.setBlock(x+(i-1), y+3, z-2, 0)
                    mc.setBlock(x+(i-1), y+3, z-3, 0)
                    mc.setBlock(x+(i-1), y+3, z-4, 0)
                    mc.setBlock(x+(i-1), y+3, z-5, 0)
                    mc.setBlock(x+(i-1), y+3, z-6, 0) 

                for i in range(0,act_len-1): #water
                    mc.setBlock(x+i, y-1, z-2, 8)
                    mc.setBlock(x+i, y-2, z-2, 8)

                    mc.setBlock(x+i, y-1, z-3, 8)
                    mc.setBlock(x+i, y-2, z-3, 8)

                    mc.setBlock(x+i, y-1, z-4, 8)
                    mc.setBlock(x+i, y-2, z-4, 8)

                    mc.setBlock(x+i, y-1, z-5, 8)
                    mc.setBlock(x+i, y-2, z-5, 8)        

                x=x-1
                z=z-1   



            if direction == 'pz':

                mc.setBlock(x+(act_len/2), y+2, z, block.AIR.id)
                mc.setBlock(x+act_len/2, y+1, z, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+2, z, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+1, z, block.AIR.id)

                mc.setBlock(x+act_len/2, y+2, z+1, block.AIR.id)
                mc.setBlock(x+act_len/2, y+1, z+1, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+2, z+1, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+1, z+1, block.AIR.id)

                mc.setBlock(x+act_len/2, y+2, z+2, block.AIR.id)
                mc.setBlock(x+act_len/2, y+1, z+2, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+2, z+2, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+1, z+2, block.AIR.id)

                mc.setBlock(x+act_len/2, y+2, z+3, block.AIR.id)
                mc.setBlock(x+act_len/2, y+1, z+3, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+2, z+3, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+1, z+3, block.AIR.id)

                mc.setBlock(x+act_len/2, y+2, z+4, block.AIR.id)
                mc.setBlock(x+act_len/2, y+1, z+4, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+2, z+4, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+1, z+4, block.AIR.id)
            

                
                mc.setBlock(x+act_len/2, y+2, z+1, 64, 9)
                mc.setBlock(x+act_len/2, y+1, z+1, 64, 4)
                mc.setBlock(x+act_len/2+1, y+2, z+1, 64, 9)
                mc.setBlock(x+act_len/2+1, y+1, z+1, 64, 3)

                mc.setBlock(x+act_len/2, y, z, 44, 5)
                mc.setBlock(x+act_len/2+1, y, z, 44, 5) 
                
                z=z+1
                for i in range(1,6): 
                    mc.setBlock(x+act_len/2-3, y-1, z-i, 2) 
                    mc.setBlock(x+act_len/2-2, y-1, z-i, 2)
                    mc.setBlock(x+act_len/2-1, y-1, z-i, 2)
                    mc.setBlock(x+act_len/2+2, y-1, z-i, 2)
                    mc.setBlock(x+act_len/2+3, y-1, z-i, 2)
                    mc.setBlock(x+act_len/2+4, y-1, z-i, 2)
                    
                    mc.setBlock(x+act_len/2-3, y, z-i, 37) 
                    mc.setBlock(x+act_len/2-2, y, z-i, 38, 1)
                    mc.setBlock(x+act_len/2-1, y, z-i, 38, 2)
                    mc.setBlock(x+act_len/2+2, y, z-i, 38, 3)
                    mc.setBlock(x+act_len/2+3, y, z-i, 38, 4)
                    mc.setBlock(x+act_len/2+4, y, z-i, 38, 5)
                    mc.setBlock(x+act_len/2, y-1, z-(i+1), 208)
                    mc.setBlock(x+act_len/2+1, y-1, z-(i+1), 208) 

                
                z=z+wy+1+6
                x=x+1

                for i in range(0,(act_len+1)):  #pool
                    mc.setBlock(x+(i-1), y-1, z-1, 4)
                    mc.setBlock(x+(i-1), y-1, z-2, 4)
                    mc.setBlock(x+(i-1), y-1, z-3, 4)
                    mc.setBlock(x+(i-1), y-1, z-4, 4)
                    mc.setBlock(x+(i-1), y-1, z-5, 4)
                    mc.setBlock(x+(i-1), y-1, z-6, 4)

                    mc.setBlock(x+(i-1), y-2, z-1, 4)
                    mc.setBlock(x+(i-1), y-2, z-2, 4)
                    mc.setBlock(x+(i-1), y-2, z-3, 4)
                    mc.setBlock(x+(i-1), y-2, z-4, 4)
                    mc.setBlock(x+(i-1), y-2, z-5, 4)
                    mc.setBlock(x+(i-1), y-2, z-6, 4)

                    mc.setBlock(x+(i-1), y-3, z-1, 4)
                    mc.setBlock(x+(i-1), y-3, z-2, 4)
                    mc.setBlock(x+(i-1), y-3, z-3, 4)
                    mc.setBlock(x+(i-1), y-3, z-4, 4)
                    mc.setBlock(x+(i-1), y-3, z-5, 4)
                    mc.setBlock(x+(i-1), y-3, z-6, 4)

                    mc.setBlock(x+(i-1), y, z-1, block.AIR.id)
                    mc.setBlock(x+(i-1), y+0, z-2, 0)
                    mc.setBlock(x+(i-1), y+0, z-3, 0)
                    mc.setBlock(x+(i-1), y+0, z-4, 0)
                    mc.setBlock(x+(i-1), y+0, z-5, 0)
                    mc.setBlock(x+(i-1), y+0, z-6, 0)

                    mc.setBlock(x+(i-1), y+1, z-1, 0)
                    mc.setBlock(x+(i-1), y+1, z-2, 0)
                    mc.setBlock(x+(i-1), y+1, z-3, 0)
                    mc.setBlock(x+(i-1), y+1, z-4, 0)
                    mc.setBlock(x+(i-1), y+1, z-5, 0)
                    mc.setBlock(x+(i-1), y+1, z-6, 0)

                    mc.setBlock(x+(i-1), y+2, z-1, 0)
                    mc.setBlock(x+(i-1), y+2, z-2, 0)
                    mc.setBlock(x+(i-1), y+2, z-3, 0)
                    mc.setBlock(x+(i-1), y+2, z-4, 0)
                    mc.setBlock(x+(i-1), y+2, z-5, 0)
                    mc.setBlock(x+(i-1), y+2, z-6, 0)

                    mc.setBlock(x+(i-1), y+3, z-1, 0)
                    mc.setBlock(x+(i-1), y+3, z-2, 0)
                    mc.setBlock(x+(i-1), y+3, z-3, 0)
                    mc.setBlock(x+(i-1), y+3, z-4, 0)
                    mc.setBlock(x+(i-1), y+3, z-5, 0)
                    mc.setBlock(x+(i-1), y+3, z-6, 0) 

                for i in range(0,act_len-1): #water
                    mc.setBlock(x+i, y-1, z-2, 8)
                    mc.setBlock(x+i, y-2, z-2, 8)

                    mc.setBlock(x+i, y-1, z-3, 8)
                    mc.setBlock(x+i, y-2, z-3, 8)

                    mc.setBlock(x+i, y-1, z-4, 8)
                    mc.setBlock(x+i, y-2, z-4, 8)

                    mc.setBlock(x+i, y-1, z-5, 8)
                    mc.setBlock(x+i, y-2, z-5, 8)        

                x=x-1
                z=z-wy-1-6    
                z=z-1

            if direction == 'nz':

                

                mc.setBlock(x+(act_len/2), y+2, z+wy, block.AIR.id)
                mc.setBlock(x+act_len/2, y+1, z+wy, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+2, z+wy, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+1, z+wy, block.AIR.id)

                mc.setBlock(x+act_len/2, y+2, z+wy-1, block.AIR.id)
                mc.setBlock(x+act_len/2, y+1, z+wy-1, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+2, z+wy-1, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+1, z+wy-1, block.AIR.id)

                mc.setBlock(x+act_len/2, y+2, z+wy-2, block.AIR.id)
                mc.setBlock(x+act_len/2, y+1, z+wy-2, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+2, z+wy-2, block.AIR.id)
                mc.setBlock(x+act_len/2+1, y+1, z+wy-2, block.AIR.id)

                
            

                z=z+2
                mc.setBlock(x+act_len/2, y+2, z+wy-1, 64, 9)
                mc.setBlock(x+act_len/2, y+1, z+wy-1, 64, 4)
                mc.setBlock(x+act_len/2+1, y+2, z+wy-1, 64, 9)
                mc.setBlock(x+act_len/2+1, y+1, z+wy-1, 64, 3)

                mc.setBlock(x+act_len/2, y, z+wy, 44, 5)
                mc.setBlock(x+act_len/2+1, y, z+wy, 44, 5) 
                z=z-2
                z=z+1
                for i in range(1,6): 
                    mc.setBlock(x+act_len/2-3, y-1, z+wy+i, 2) 
                    mc.setBlock(x+act_len/2-2, y-1, z+wy+i, 2)
                    mc.setBlock(x+act_len/2-1, y-1, z+wy+i, 2)
                    mc.setBlock(x+act_len/2+2, y-1, z+wy+i, 2)
                    mc.setBlock(x+act_len/2+3, y-1, z+wy+i, 2)
                    mc.setBlock(x+act_len/2+4, y-1, z+wy+i, 2)
                    
                    mc.setBlock(x+act_len/2-3, y, z+wy+i, 37) 
                    mc.setBlock(x+act_len/2-2, y, z+wy+i, 38, 1)
                    mc.setBlock(x+act_len/2-1, y, z+wy+i, 38, 2)
                    mc.setBlock(x+act_len/2+2, y, z+wy+i, 38, 3)
                    mc.setBlock(x+act_len/2+3, y, z+wy+i, 38, 4)
                    mc.setBlock(x+act_len/2+4, y, z+wy+i, 38, 5)
                    mc.setBlock(x+act_len/2, y-1, z+wy+(i+1), 208)
                    mc.setBlock(x+act_len/2+1, y-1, z+wy+(i+1), 208) 

                
                x=x+1
                

                for i in range(0,(act_len+1)):  #pool
                    mc.setBlock(x+(i-1), y-1, z-1, 4)
                    mc.setBlock(x+(i-1), y-1, z-2, 4)
                    mc.setBlock(x+(i-1), y-1, z-3, 4)
                    mc.setBlock(x+(i-1), y-1, z-4, 4)
                    mc.setBlock(x+(i-1), y-1, z-5, 4)
                    mc.setBlock(x+(i-1), y-1, z-6, 4)

                    mc.setBlock(x+(i-1), y-2, z-1, 4)
                    mc.setBlock(x+(i-1), y-2, z-2, 4)
                    mc.setBlock(x+(i-1), y-2, z-3, 4)
                    mc.setBlock(x+(i-1), y-2, z-4, 4)
                    mc.setBlock(x+(i-1), y-2, z-5, 4)
                    mc.setBlock(x+(i-1), y-2, z-6, 4)

                    mc.setBlock(x+(i-1), y-3, z-1, 4)
                    mc.setBlock(x+(i-1), y-3, z-2, 4)
                    mc.setBlock(x+(i-1), y-3, z-3, 4)
                    mc.setBlock(x+(i-1), y-3, z-4, 4)
                    mc.setBlock(x+(i-1), y-3, z-5, 4)
                    mc.setBlock(x+(i-1), y-3, z-6, 4)

                    mc.setBlock(x+(i-1), y, z-1, block.AIR.id)
                    mc.setBlock(x+(i-1), y+0, z-2, 0)
                    mc.setBlock(x+(i-1), y+0, z-3, 0)
                    mc.setBlock(x+(i-1), y+0, z-4, 0)
                    mc.setBlock(x+(i-1), y+0, z-5, 0)
                    mc.setBlock(x+(i-1), y+0, z-6, 0)

                    mc.setBlock(x+(i-1), y+1, z-1, 0)
                    mc.setBlock(x+(i-1), y+1, z-2, 0)
                    mc.setBlock(x+(i-1), y+1, z-3, 0)
                    mc.setBlock(x+(i-1), y+1, z-4, 0)
                    mc.setBlock(x+(i-1), y+1, z-5, 0)
                    mc.setBlock(x+(i-1), y+1, z-6, 0)

                    mc.setBlock(x+(i-1), y+2, z-1, 0)
                    mc.setBlock(x+(i-1), y+2, z-2, 0)
                    mc.setBlock(x+(i-1), y+2, z-3, 0)
                    mc.setBlock(x+(i-1), y+2, z-4, 0)
                    mc.setBlock(x+(i-1), y+2, z-5, 0)
                    mc.setBlock(x+(i-1), y+2, z-6, 0)

                    mc.setBlock(x+(i-1), y+3, z-1, 0)
                    mc.setBlock(x+(i-1), y+3, z-2, 0)
                    mc.setBlock(x+(i-1), y+3, z-3, 0)
                    mc.setBlock(x+(i-1), y+3, z-4, 0)
                    mc.setBlock(x+(i-1), y+3, z-5, 0)
                    mc.setBlock(x+(i-1), y+3, z-6, 0) 

                for i in range(0,act_len-1): #water
                    mc.setBlock(x+i, y-1, z-2, 8)
                    mc.setBlock(x+i, y-2, z-2, 8)

                    mc.setBlock(x+i, y-1, z-3, 8)
                    mc.setBlock(x+i, y-2, z-3, 8)

                    mc.setBlock(x+i, y-1, z-4, 8)
                    mc.setBlock(x+i, y-2, z-4, 8)

                    mc.setBlock(x+i, y-1, z-5, 8)
                    mc.setBlock(x+i, y-2, z-5, 8)        

                x=x-1
                  


        if(wy>(zwall_pos+5) and width>4 and wy>13 and yz<1):
            yz=yz+1
            # print('yz',yz)
            shawHouse.zsplitHouse(self, height, length, width, aa, wy, yz, zwall_pos, x, y, z, x_wall_1, floor, direction)




            





                         
            






            
            




        

