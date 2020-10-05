import numpy as np

# Interpolates incoming data to 32x32 grid which represents the predetermined bounding box. 
# Inputs are numpy vectors: xd are longitude coords, yd are latitude coords, data is the data corresponding to the coords
# Output is 32x32 array with the interpolated data, rows correspond to lines of latitude and columns correspond to lines of longitude

def process(xd,yd,data):
    xd = data[:,1]
    yd = data[:,0]
    
    bboxx = (-125.2586,-116.6586)
    bboxy = (43.9992,49.3992)
    
    dx = (np.sort(xd) - np.roll(np.sort(xd),1))[1:]
    dy = (np.sort(yd) - np.roll(np.sort(yd),1))[1:]
    
    dx_min = np.median(dx)
    dy_min = np.median(dy)
    
    x = np.linspace(bboxx[0],bboxx[1],32)
    y = np.linspace(bboxy[0],bboxy[1],32)
    
    dmin = np.amin([dx_min,dy_min])
    scale = (y[1]-y[0])/dmin
        
    data_new = np.zeros((32,32))
    
    i = 0
    for xc in x:
        j = 0
        for yc in y:
            inds = np.where((xd - xc)**2 + (yd - yc)**2 < (0.6*scale*dmin)**2)[0]
            if len(inds) != 0:
                data_new[j,i] = np.dot((xd[inds] - xc)**2 + (yd[inds] - yc)**2,data[inds,2])/np.sum((xd[inds] - xc)**2 + (yd[inds] - yc)**2)
                
            j += 1
        i += 1
                
            
    return data_new
