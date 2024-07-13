import cv2
import os
import hashlib
ip=r"C:\Users\Lenovo\Downloads\nature.jpg"
img=cv2.imread(ip)
if img is None:
    print("Image is not found")
    exit()
h,w,ch=img.shape
msg=input("Enter a message:")
pwd=input("Enter a password:")
ho=hashlib.sha256(pwd.encode())
hp=ho.digest()
d={}
c={}
for i in range(256):
    d[chr(i)]=i
    c[i]=chr(i)
n=0
m=0
z=0
for i in range(len(msg)):
    nv=(int(img[n,m,z])+d[msg[i]]+hp[i%len(hp)])%256
    img[n,m,z]=nv
    m+=1
    if m>=w:
        m=0
        n+=1
    if n>=h:
        print("Image is too small to hold the entire message.")
        break
    z=(z+1)%3
eip=os.path.join(os.path.dirname(ip),"ei.jpg")
cv2.imwrite(eip,img)
os.startfile(eip)
print("Message has been encrypted into '{eip}'.")
