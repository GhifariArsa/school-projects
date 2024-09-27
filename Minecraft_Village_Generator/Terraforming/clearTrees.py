from time import sleep
from mcpi import minecraft
from mcpi import block
from mcpi import vec3
import picraft
import utility as utility

#connections
mcpiWord = picraft.World()


def get_heights_fastQuery(vec:vec3.Vec3,x_blocks,z_blocks):
    x_start = vec.x - (x_blocks)
    x_end = vec.x + (x_blocks)
    z_start = vec.z - (z_blocks)
    z_end = vec.z + (z_blocks)
    xz_tuple_list =[]
    for i in range(int(x_start),int(x_end+1)):
        for j in range(int(z_start),int(z_end+1)):
            t = (i,j)
            xz_tuple_list.append(t)
    
    heights_FQ = utility.query_blocks(mcpiWord.connection,xz_tuple_list,'world.getHeight(%d,%d)',int)
    return dict(heights_FQ)






class clearTrees:
    def __init__(self) -> None:
        self.updatedDict = {}
        pass

    def removeTrees(mc:minecraft.Minecraft,endVec:vec3.Vec3,ids_FQ):
        print('Removing Trees...')
        woodLeavesCactusID_list = [17,162,18,161,99,100,81]
        for block in ids_FQ:
            if block[1][0] in woodLeavesCactusID_list:
                mc.setBlock(block[0][0],block[0][1],block[0][2],0)
        print('Done Removing Trees!')

    def updateDict(ids_FQ,startVec:vec3.Vec3):
        xz_tuple_list = []
        for i in range(int(startVec.x)-20,int(startVec.x)+20):
            for j in range(int(startVec.z)-20,int(startVec.z)+20):
                xz_tuple_list.append((i,j))

        heights_FQ_list = utility.query_blocks(mcpiWord.connection,xz_tuple_list,'world.getHeight(%d,%d)',int)
        
        temp_dict = dict(heights_FQ_list)

        return temp_dict
        

        
        


    
        

        




