from mcpi.minecraft import Minecraft
from house import House
from Terraforming.terraform import Terraform

# Initialize Minecraft
mc = Minecraft.create()

house = House(mc)
terraform = Terraform(mc)
chatmessage = ''

# Location of the village
x,y,z = mc.player.getTilePos()

terraform.doTerraform(x, y, z)
# print(terraform.gaussianBlur(x,y,z))


# while True:
#     chatEvents = mc.events.pollChatPosts()
#     for chatEvent in chatEvents:
#         chatmessage = chatEvent.message
#         print(chatmessage)

#     if chatmessage == 'house':
#         x, y, z = mc.player.getTilePos()
#         print(x, y, z)
#         house.buildHouse(x, y, z)
#         chatmessage = ''
        
#     if chatmessage == 'where':
#         pos = mc.player.getTilePos()
#         x = pos.x
#         y = pos.y
#         z = pos.z
#         string = str(x) + ' ' + str(y) + ' ' + str(z)
#         mc.postToChat(string)
#         chatmessage = ''
    
#     if chatmessage == 'quit':
#         break


            
