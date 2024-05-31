from random import randint
from time import sleep
from mcpi import minecraft
from mcpi import block
from Path.house import House
from Path.utility import query_blocks
from Terraforming.terraform import Terraform
from Path.path import Path
from mcpi import vec3
import math
import random
import utility
import picraft
from Terraforming.clearTrees import clearTrees
from House.shawHouse import *
import time
from Decoration.PathDecoration import *



house_placement_vectors = []
global intersection_vectors
intersection_vectors = []
global pathHeight
pathHeight = 0
#timer
start = time.time()

def terraformRoad(mc:minecraft.Minecraft,terraform:Terraform,main_intersectionVec:vec3.Vec3,heights_FQ_dict_main:dict,type,firstTime=False):
    global pathHeight
    #maximum lengths the side roads can extend, for terraforming
    x,y,z = main_intersectionVec
    terraLen = 0 #x axis
    terraWid = 0 #z axis

    if type =='start':
        terraLen = 6    #x axis
        terraWid = 15+1 #z axis
        
    elif type=='sideRoad':
        terraLen = 15*2*3   #x axis
        terraWid = 14      #z axis
    elif type =='mainRoad':
        terraLen == 15  #x axis
        terraWid = 15*6 #z axis 
        z = z +5
        


    #fix avg height
    if firstTime is True:
        sum = 0
        count=0
        if type == 'sideRoad' or type=='start':
            for key,val in heights_FQ_dict_main.items():
                if (key[0]<x+(terraLen//2) and key[0]>x-(terraLen//2)) and (key[1]<z+terraWid and key[1]>z):
                    sum+=val
                    count+=1
                    # mc.setBlock(key[0],val,key[1],block.DIAMOND_BLOCK)
        elif type=="mainRoad":
            # mc.setBlocks(x,y,z,x,y+5,z,block.GOLD_BLOCK)
            

            for key,val in heights_FQ_dict_main.items():
                if (key[0]>x-5 and key[0]<x+5) and (key[1]<z+terraWid and key[1]>z):
                    sum+=val
                    count+=1
                    # mc.setBlock(key[0],val,key[1],block.DIAMOND_BLOCK)
        avgHeight = math.ceil(sum//count)
        pathHeight = avgHeight
    else:
        avgHeight = pathHeight

    #bottom left Vec
    if type =='start':
        bottomLeftVec = vec3.Vec3(main_intersectionVec.x-(terraLen//2)+1,avgHeight,main_intersectionVec.z+1)
    elif type=='sideRoad':
        bottomLeftVec = vec3.Vec3(main_intersectionVec.x-(terraLen//2),avgHeight,main_intersectionVec.z-(terraWid//2))
    elif type =='mainRoad':
        bottomLeftVec = vec3.Vec3(x-4,avgHeight,z+1)

    doTerraforming(mc,terraform,bottomLeftVec,terraLen,terraWid,avgHeight,type)
    sleep(2)
    #update heights
    heights_FQ_dict_main = get_heights_fastQuery(main_intersectionVec,120,150)
    # heights_FQ_dict_main = get_heights_fastQuery(main_intersectionVec,60,80)
    sleep(2)

    return heights_FQ_dict_main
    

def doClearTrees(mc:minecraft.Minecraft,mcpiWord,main_intersectionVec,heights_FQ_dict_main,type):

    coordinateListOfToBePath = getCoordinateRangeOfToBePath(main_intersectionVec,type)
    ids_FQ = query_blocks(mcpiWord.connection, coordinateListOfToBePath, "world.getBlock(%d,%d,%d)", lambda ans: tuple(map(int, ans.split(","))))

    clearTrees.removeTrees(mc,main_intersectionVec,ids_FQ)
    sleep(1)

    heights_FQ_dict_main = get_heights_fastQuery(main_intersectionVec,100,200)

    return dict(heights_FQ_dict_main)



def getCoordinateRangeOfToBePath(startVec:vec3.Vec3,type):
    coordList =[]
    scanLen=40
    scanWid=40
    if type == 'main':
        scanLen=60 + 20
        scanWid=40 + 20
    elif type=='side':
        scanLen = 50 + 20
        scanWid = 30 + 20
    elif type =='start':
        scanLen =20 
        scanWid = 10 
    x,y,z = startVec
    x= int(x)
    y= int(y)
    z= int(z)

    for i in range(x-scanWid,x+scanWid):  #x
        for j in range(z-scanLen,z+scanLen): #z
            for k in range(y-10,y+100): #yw
                
                coordList.append((i,k,j))

                    
    return coordList

def getCoordinateListOfPlatform(endVec:vec3.Vec3,heights_FQ:dict):
    coordList = []
    scanRange = 6
    x,y,z = endVec
    for i in range(int(x-scanRange),int(x+scanRange)):
        for j in range(int(z-scanRange),int(z+scanRange)):
            y = heights_FQ[(i,j)]
            coordList.append((i,y,j))


    return coordList

def checkAroundForWater(coordinateList):
            blockResponse = utility.query_blocks(mcpiWord.connection, coordinateList, "world.getBlock(%d,%d,%d)", int)
            blockResponseDict = {}
                    
            for i in blockResponse:
                blockResponseDict[(i[0][0], i[0][1], i[0][2])] = i[1]
                
            waterBlocks = [8,9]         
            waterBlockCount = 0
            for key, item in blockResponseDict.items():
                if item in waterBlocks:
                    waterBlockCount += 1
                
            average_water = waterBlockCount / len(blockResponseDict)
            if average_water >= 0.2:
                return True
            else:
                return False

def changePosShawHouse(endVec:vec3.Vec3,dir,len,wid):
    #len is x-axis
    #wid is z-axis
    x,y,z = endVec
    if dir=='px':
        x=x+5
        z=z-(wid//2)
    elif dir=='nx':
        x = x-len-3
        z = z-(wid//2)         
    elif dir == 'pz':
        z = z+2
        x = x-(len//2)

    elif dir == 'nz':
        z = z - wid -3
        x = x-(len//2)
        pass


    return x,y,z

def createHouse(Endvec:vec3.Vec3,final_dir,l,h,w):

    #select random house
    if random.randint(1,2)==1:
        l -=2
        w -=2
        x,y,z = changePosShawHouse(Endvec,final_dir,l,w)
        y+=1
        h2 = shawHouse()
        h2.genHouse(h,w,l,x,y,z,final_dir)
    else:
        #TO build middle of endVec based on final direction
        if final_dir =='px':
            half_l = l//2
            Endvec.z -=half_l+1
            Endvec.x+=1
        if final_dir =='nx':
            half_w = w//2
            Endvec.x -=l+2
            Endvec.z -=half_w
        if final_dir =='pz':
            Endvec.z+=2
            half_l = l//2
            Endvec.x -= half_l
        if final_dir =='nz':
            half_l = l//2
            Endvec.z -=w+2
            Endvec.x -=half_l
        Endvec.y = Endvec.y+1
        h1 = House(mc,Endvec,l,h,w,final_dir)
        h1.buildHouse() 
        
    return l,w

def createPath(direction,vecP:vec3.Vec3,type='main'):
    global heights_FQ_dict_main
    len = randint(12,15)
    wid = randint(2,4)

    path = Path(vecP,heights_FQ_dict_main,type)
    #try to catch KeyError and update heightsFQ based on endVec
    try:
        if direction =='px':

            #TO build middle of endVec
            half_wid = wid//2
            endVec.z -=half_wid

            path.gen_px(len,wid)
            #center endVec at the end of path and change pos if two middle blocks
            if path.endVec.z%1!=0:
                path.endVec.z = math.floor(path.endVec.z)
            if wid%2==0:
                choice = random.choice([0,1])
                path.endVec.z -= choice


        if direction =='pz':
            #TO build middle of endVec
            half_wid = wid//2
            endVec.x -=half_wid

            path.gen_pz(len,wid)
            #center endVec at the end of path and change pos if two middle blocks
            if path.endVec.x%1!=0:
                path.endVec.x = math.floor(path.endVec.x)
            if wid%2==0:
                choice = random.choice([0,1])
                path.endVec.x -= choice
            
        if direction =='nx':
            #TO build middle of endVec
            half_wid = wid//2
            endVec.z -=half_wid

            path.gen_nx(len,wid)
            #center endVec at the end of path and change pos if two middle blocks
            if path.endVec.z%1!=0:
                path.endVec.z = math.floor(path.endVec.z)
            if wid%2==0:
                choice = random.choice([0,1])
                path.endVec.z -= choice
        
        if direction =='nz':
            #TO build middle of endVec
            half_wid = wid//2
            endVec.x -=half_wid

            path.gen_nz(len,wid)
            #center endVec at the end of path and change pos if two middle blocks
            if path.endVec.x%1!=0:
                path.endVec.x = math.floor(path.endVec.x)
            if wid%2==0:
                choice = random.choice([0,1])
                path.endVec.x -= choice
    except KeyError:
        heights_FQ_dict_main = get_heights_fastQuery(path.endVec,100,200)
        print('heightsFQ is updated!')
        createPath(direction,path.endVec)

    
    return path.endVec

def createSubPath(main_intersectionVec:vec3.Vec3,subPathDirection,NosubHouses,pathData:list):
    global house_placement_vectors
    endVec = vec3.Vec3(main_intersectionVec.x,main_intersectionVec.y,main_intersectionVec.z)
    intersectionVec = endVec
    #move no of path chunks away from main intersection
    for i in range(2):
        intersectionVec = createPath(subPathDirection,intersectionVec,'main')
    intersection_vectors.append(intersectionVec)
    
    #subHouseDirections list 
    if subPathDirection == 'px':
        sub_directions = ['pz','nz','px']
    else:
        sub_directions = ['pz','nz','nx']
    
    #remove negative z based on pathData
    if pathData[0] ==None or pathData[1]==None:
        pass
    else:
        if pathData[0] is True and subPathDirection=='px':
            sub_directions.remove('nz')
        if pathData[1] is True and subPathDirection=='nx':
            sub_directions.remove('nz')
        


    #insert house paths
    pzPresent = False
    for i in range(NosubHouses):
        try:
            sub_house_dir = random.choice(sub_directions)
            sub_directions.remove(sub_house_dir)
        except IndexError:
            # print('value error at random.choice in main.py def createSubPath')
            break

        #add path data into stack
        if sub_house_dir == 'pz':
            pzPresent = True
            


        endVec = createPath(sub_house_dir,intersectionVec,'main')
        house_placement_vectors.append((endVec,sub_house_dir))
    
    
    return pzPresent
        




def testBlock(mc:minecraft.Minecraft,endVec:minecraft.Vec3):
    mc.setBlocks(endVec.x,endVec.y,endVec.z,endVec.x,endVec.y+4,endVec.z,block.DIAMOND_BLOCK)

def get_heights_fastQuery(vec:vec3.Vec3,x_blocks,z_blocks):
    x,y,z = vec
    x_start = x - (x_blocks)
    x_end = x + (x_blocks)
    z_start = z - (z_blocks)
    z_end = z + (z_blocks)
    xz_tuple_list =[]
    for i in range(int(x_start),int(x_end+1)):
        for j in range(int(z_start),int(z_end+1)):
            t = (i,j)
            xz_tuple_list.append(t)
    
    heights_FQ = utility.query_blocks(mcpiWord.connection,xz_tuple_list,'world.getHeight(%d,%d)',int)
    return dict(heights_FQ)

def createCircle(mc:minecraft.Minecraft,endVec:vec3.Vec3,radius,blockID=(97,4)):
    temp_y = heights_FQ_dict_main[(endVec.x,endVec.z)]
    copyVec = vec3.Vec3(endVec.x,temp_y,endVec.z)
    z_axis_lower = 0
    z_axis_upper = 0
    count = 1
    for x in range(int(copyVec.x-radius),int(copyVec.x+(radius*2)+1)):
        for z in range(int(copyVec.z+z_axis_lower),int(copyVec.z+z_axis_upper+1)):
            y = heights_FQ_dict_main[(x,z)]
            mc.setBlock(x,y,z,blockID[0],blockID[1])
        if count<=radius:
            z_axis_lower -= 1
            z_axis_upper += 1 
            count+=1
        else:
            z_axis_lower += 1
            z_axis_upper -= 1 

def createPlatform(mc:minecraft.Minecraft,vec:vec3.Vec3,direction,side_len,blockID=(1,0)):
    side_len = side_len
    height = 1
    # side_len = 5
    

    half_len = side_len//2
    #convert to int to avoid TypeError
    vec.x = int(vec.x)
    vec.y = int(vec.y)
    vec.z = int(vec.z)
    if direction=='pz':
        mc.setBlocks((vec.x-half_len),(vec.y+height),(vec.z+1),(vec.x+half_len),(vec.y+height),(vec.z+side_len),blockID[0])
        #clear all blocks above platform
        mc.setBlocks((vec.x-half_len),(vec.y+height+1),(vec.z+1),(vec.x+half_len),(vec.y+height+20),(vec.z+side_len),block.AIR.id)
        
        vec_bottom_left = vec3.Vec3((vec.x-half_len),(vec.y+height+2),(vec.z+1))


    if direction=='nz':
        mc.setBlocks(vec.x-half_len,vec.y+height,vec.z-1,vec.x+half_len,vec.y+height,vec.z-side_len,blockID[0])
        #clear all blocks above platform
        mc.setBlocks(vec.x-half_len,vec.y+height+1,vec.z-1,vec.x+half_len,vec.y+height+20,vec.z-side_len,0)
        
        vec_bottom_left = vec3.Vec3(vec.x-half_len,vec.y+height+2,vec.z-side_len)

    
    if direction =='px':
        mc.setBlocks(vec.x+1,vec.y+height,vec.z+half_len,vec.x+side_len,vec.y+height,vec.z-half_len,blockID[0])
        #clear all blocks above platform
        mc.setBlocks(vec.x+1,vec.y+height+1,vec.z+half_len,vec.x+side_len,vec.y+height+20,vec.z-half_len,0)
        
        vec_bottom_left =vec3.Vec3(vec.x+1,vec.y+height+2,vec.z+half_len-side_len)



    if direction =='nx':
        mc.setBlocks(vec.x-1,vec.y+height,vec.z+half_len,vec.x-side_len,vec.y+height,vec.z-half_len,blockID[0])
        #clear all blocks above platform
        mc.setBlocks(vec.x-1,vec.y+height+1,vec.z+half_len,vec.x-side_len,vec.y+height+20,vec.z-half_len,0)
        
        vec_bottom_left = vec3.Vec3(vec.x-side_len,vec.y+height+2,vec.z+half_len-side_len)
    
    return vec_bottom_left


def doTerraforming(mc:minecraft.Minecraft,terraform:Terraform,plat_bottomLeft:vec3.Vec3,length,width,h,type):
    print('Terraforming...')
    forRoad =False
    
    if type=='forHouse':
        length += 8 #x-axis
        width += 9  #z-axis
        
        plat_bottomLeft.x-=2
        plat_bottomLeft.z-=2
        forRoad = False
    elif type =='sideRoad':
        width += 31  #z-axis
        length += 10
        plat_bottomLeft.z=plat_bottomLeft.z-9
        plat_bottomLeft.x=plat_bottomLeft.x-9
        forRoad = True
    elif type == 'start':
        plat_bottomLeft.x-=1
        width = width +8
        forRoad = True
    elif type == 'mainRoad':
        length = length+18 #x-axis
        width = width+8  #z-axis
        plat_bottomLeft.x=plat_bottomLeft.x-4

        forRoad = True
        
    terraform.doTerraform(plat_bottomLeft.x, plat_bottomLeft.y, plat_bottomLeft.z, length, width,h,forRoad,type)
    print('Terraforming Done!')


def createPathBack(mc:minecraft.Minecraft,endVec:vec3.Vec3,direction):
    if direction == 'px':
        reversed_direction = 'nx'
    if direction == 'nx':
        reversed_direction = 'px'
    if direction == 'pz':
        reversed_direction = 'nz'
    if direction == 'nz':
        reversed_direction = 'pz'
    createPath(reversed_direction,endVec,'main')
    
    return



    
        

            
    


##MAIN##


#mc connection
mc = minecraft.Minecraft.create()
mcpiWord = picraft.World()
# Initialize Terraforming
terraform = Terraform(mc, mcpiWord)

vec3_player = mc.player.getTilePos()
endVec = vec3.Vec3()
endVec = vec3_player
platform_bottomLeft_vec = vec3.Vec3()


#make global of heights_FQ_dict for path.py to use
global heights_FQ_dict_main
#get heights at start of code around player
heights_FQ_dict_main = get_heights_fastQuery(vec3_player,100,200)

chatmessage = ''
firstLoop = True
global direction_stack
direction_stack = []
#for terraforming platform
platform_bottomLeft_vec_list = []

attempt = 0

mc.postToChat('Enter 1 in chat, then enter rp')


while chatmessage!='e':
    # if attempt==0:
    #     print('Run Program again! -Program does not work after restarting server')
    #     mc.postToChat('Run Program again! -Program does not work after restarting server')
    #     mc.postToChat('Type \'e\' to terminate Program')
    #     chatmessage ='rp'

    #     attempt+=1
    
    chatEvents = mc.events.pollChatPosts()
    for chatEvent in chatEvents:
        chatmessage = chatEvent.message


    #stack to keep track of last path for house face direction
    #reset coords
    if chatmessage=='1':
        x,y,z = endVec
        mc.setBlock(x,y,z,81)

        chatmessage='rp'
        print('Run program again! and type \'rp\' into chat.')
        mc.postToChat('Run program again! and type \'rp\' into chat.')
        break


    if chatmessage == 'r':
        tempPlayerVec = mc.player.getTilePos()
        endVec.y = mc.getHeight(tempPlayerVec.x,tempPlayerVec.z)
        endVec.x = tempPlayerVec.x
        endVec.z = tempPlayerVec.z
        heights_FQ_dict_main = get_heights_fastQuery(endVec,100,200)
        house_placement_vectors.clear()
        
        
        chatmessage =''
    
    #TESTING - place blocks too see endVec location
    if chatmessage == 'ev':
        testBlock(mc,endVec)

        
        chatmessage=''

    #perform terraforming
    if chatmessage == 'c':
        x,y,z = mc.player.getTilePos()
        mc.setBlocks(x-100,y,z-100,x+100,y+100,z+100,block.AIR.id)
        chatmessage=''

        
        chatmessage=''

    #create platform at endVec and terrafrom then inserts house
    if chatmessage == 'p':
        house_l = randint(6,10)   #x
        house_w = randint(6,10)  #z
        side_len = max(house_l,house_w)+2  
        direction = direction_stack.pop()
        

        #check for water
        coordinateListOfPlatform = getCoordinateListOfPlatform(endVec,heights_FQ_dict_main)

        platform_bottomLeft_vec=createPlatform(mc,endVec,direction,side_len,(1,0))
        platform_bottomLeft_vec_list.append(platform_bottomLeft_vec)
        
        #terraforming platform
        plat_height =endVec.y+1
        doTerraforming(mc,terraform,platform_bottomLeft_vec,house_l,house_w,plat_height)

        #insert house
        # house_height = endVec.y+2
        # houseVec = vec3.Vec3(endVec.x,house_height,endVec.z)
        # house_len,house_wid = createHouse(houseVec,direction,house_l,house_w)


        chatmessage=''

    #positive x 
    if chatmessage =='px':
        
        endVec = createPath('px',endVec)
        direction_stack.append(chatmessage)
        chatmessage=''
    #negative x
    if chatmessage =='nx':   

        endVec = createPath('nx',endVec)
        direction_stack.append(chatmessage)

        chatmessage=''

    #positive z
    if chatmessage =='pz':   

        endVec = createPath('pz',endVec)
        direction_stack.append(chatmessage)

        chatmessage=''
    #negative z
    if chatmessage =='nz': 

        endVec = createPath('nz',endVec)
        direction_stack.append(chatmessage)

        #TODO fix vecEnd to middle block issue
        chatmessage=''
    
    #build house at endVec
    if chatmessage =='h':
        #make endVec.y of house higher than platform so it builds on top of platform
        


        if True:
            height = 5
            width = random.randint(10,20) #z
            length = random.randint(10,30) #x
            
            
            dir = 'px'
            dir = direction_stack[-1]
            
            createHouse(endVec,dir,length,height,width)
        else:
            createHouse(endVec,'px',random.randint(15,25),5,random.randint(15,25))


        chatmessage=''
    #testing house for recursion
    if chatmessage =='th':
        endVec = mc.player.getTilePos()
        createHouse(endVec,'px')
        chatmessage=''

        chatmessage=''
    if chatmessage == 'plat':
        x,y,z = mc.player.getTilePos()
        mc.setBlocks(x-80,y-1,z-80,x+80,y-1,z+80,block.NETHER_BRICK.id)
        chatmessage=''

    if chatmessage == 'rp':
        #too slow if both options True
        clearTrees_bool = False
        terraformRoad_bool = True

        endVec.y = heights_FQ_dict_main[endVec.x,endVec.z]
        
        circle_blockID = (208,0)
        circle_radius = 6
                    
        noOfIntersections = 2
        #initial path start
        #clear Tress at start to get avg height of floor
        heights_FQ_dict_main = doClearTrees(mc,mcpiWord,endVec,heights_FQ_dict_main,'start')
        print('On sleep for 2s to MC to update')
        sleep(2)
        #terraform land for start path
        if terraformRoad_bool:
            heights_FQ_dict_main = terraformRoad(mc,terraform,endVec,heights_FQ_dict_main,'start',firstTime=True)
            print('On sleep for 2s to MC to update')
            sleep(2)


        main_intersectionVec = createPath('pz',endVec)
        intersection_vectors.append(main_intersectionVec)
        
        pathDataList = [None,None]

        for numInts in range(noOfIntersections):
            #remove trees on sides (x axis)
            if clearTrees_bool:
                heights_FQ_dict_main = doClearTrees(mc,mcpiWord,main_intersectionVec,heights_FQ_dict_main,'side')
                print('On sleep for 2s to MC to update')
                sleep(2)

            if numInts >=1:
                #terraform land for paths for main road
                if terraformRoad_bool:
                    heights_FQ_dict_main = terraformRoad(mc,terraform,main_intersectionVec,heights_FQ_dict_main,'mainRoad')
                    print('On sleep for 2s to MC to update')
                    sleep(2)
                #no of skips for next intersection
                for j in range(6):
                    main_intersectionVec = createPath('pz',main_intersectionVec)

                intersection_vectors.append(main_intersectionVec)
            
            #terraform land for paths
            if terraformRoad_bool:
                heights_FQ_dict_main = terraformRoad(mc,terraform,main_intersectionVec,heights_FQ_dict_main,'sideRoad')
                print('On sleep for 2s to MC to update')
                sleep(2)
            
            createCircle(mc,main_intersectionVec,circle_radius,circle_blockID)
            #2 blocks back from circle to cover for road being terraformed
            temp_vec = vec3.Vec3(main_intersectionVec.x,main_intersectionVec.y,main_intersectionVec.z)
            temp_vec.x =temp_vec.x-2
            temp_vec =createPath('nz',main_intersectionVec)
            if numInts!=0:
                Tx,Ty,Tz = temp_vec
                createPath('nz',vec3.Vec3(Tx-2,Ty,Tz))

            
            

                                
            NosubHouses = random.randint(1,3)
            pzPresent = createSubPath(main_intersectionVec,'px',NosubHouses,pathDataList)
            pathDataList[0]=pzPresent

            #randomise more houses on other side of intersection
            if NosubHouses==3:
                NextNosubHouses = random.randint(1,2)
            elif NosubHouses==1:
                NextNosubHouses = random.randint(2,3)
            else:
                NextNosubHouses = random.randint(1,3)
            
            pzPresent = createSubPath(main_intersectionVec,'nx',NextNosubHouses,pathDataList)
            pathDataList[1]=pzPresent
            
            # break loop after village has 3 intersections and at least 5 houses
            if len(house_placement_vectors)>=5 and numInts>=3-1:
                # print('No of houses =',len(house_placement_vectors))
                
                break
            #removeTrees large area around for next intersection (clear y axis)
            if numInts+1!=noOfIntersections and clearTrees_bool:
                heights_FQ_dict_main = doClearTrees(mc,mcpiWord,main_intersectionVec,heights_FQ_dict_main,'main')
                print('On sleep for 2s to MC to update')
                sleep(2)
                pass

        
         
        #insert platform of houses and terraform around platform
        isWater = False
        isWater_bool_list = []
        house_l = 0
        house_h = 0
        house_w = 0 
        for vec_and_dir in house_placement_vectors:
            
            #random values for house
            house_l = randint(15,20)   #x
            house_h = randint(5,6) 
            house_w = randint(15,20)  #z

            side_len = max(house_l,house_w)+1 


            #check if end of path is water or not (if water, skip platform and house)
            coordinateListOfPlatform = getCoordinateListOfPlatform(vec_and_dir[0],heights_FQ_dict_main)
            isWater = checkAroundForWater(coordinateListOfPlatform)
            isWater_bool_list.append(isWater)
            if isWater:
                print('skip platform water found!')
                continue

            #build platform
            platform_bottomLeft_vec =createPlatform(mc,vec_and_dir[0],vec_and_dir[1],side_len,(1,0))
            #do terraforming around platform
            plat_height = vec_and_dir[0].y
            if terraformRoad_bool:
                doTerraforming(mc,terraform,platform_bottomLeft_vec,house_l,house_w,plat_height,'forHouse')
                print('On sleep for 2s to MC to update')
                sleep(2)
            #create pathbackwards after terraforming
            createPathBack(mc,vec_and_dir[0],vec_and_dir[1])

        i=0
        #place houses
        for vec_and_dir in house_placement_vectors:
            if isWater_bool_list[i] is True:
                i+=1
                continue
            i+=1
            #make endVec.y of house higher than platform so it builds on top of platform
            # vec_and_dir[0].y =plat_height+1
            house_len,house_wid = createHouse(vec_and_dir[0],vec_and_dir[1],house_l,house_h,house_w)
        #place decoration at all intersections
        for vec in intersection_vectors:
            x,y,z = vec
            rand_num = randint(1,3)
            if rand_num==1:
                decoration.createFlowerBed(x,y+1,z)
            elif rand_num==2:
                decoration.createLampPost(x,y,z)
            elif rand_num==3:
                decoration.createWell(x,y+1,z)
        
        #create village exit
        village_end_Vec = createPath('pz',main_intersectionVec)   
            
                
                
        
        print('***Village Generated***')
        end = time.time()
        print('Time taken is',round(end - start),'seconds.')
        break
        chatmessage =''

            
            

        




            
    




    












    
