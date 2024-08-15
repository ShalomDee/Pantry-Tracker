'use client'
//import Image from "next/image";
import {useState, useEffect, useCallback} from "react";
import {firestore} from "@/firebase";
import { Box, Typography, Modal, Stack, TextField, Button, InputBase } from "@mui/material";
import { query, collection, getDocs, deleteDoc, getDoc, setDoc, doc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
    setFilteredInventory(inventoryList);
  };

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const {quantity} = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  const filterItems = useCallback((query) => {
    const filteredList = query
      ? inventory.filter(({ name }) => name.toLowerCase().includes(query.toLowerCase()))
      : inventory;
    setFilteredInventory(filteredList);
  }, [inventory]);

  useEffect(() => {
    updateInventory();
  }, []);

  useEffect(() => {
    filterItems(searchQuery);
  }, [searchQuery, filterItems]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display = "flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center"
      gap={2}
      sx={{
        position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'url("/background 1.jpg") !important',
      backgroundSize: 'cover !important',
      backgroundPosition: 'center !important',
      opacity: 0.85,
      zIndex: -1,
    },
      }}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="#F4E9D1"
          border="2px solid #000" 
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant ="filled"
              fullWidth
              value={itemName}
              onChange={(e) =>{
                setItemName(e.target.value);
              }}
            />
            <Button 
              variant="outlined" 
              onClick={() => {
                addItem(itemName)
                setItemName('');
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Stack width="800px" spacing={2}>
        <Button 
          variant="contained" 
          onClick={handleOpen}
          sx={{ bgcolor: '#381A10', color: '#fff' }}
        >
          Add New Item
        </Button>
        <InputBase
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          sx={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "20px",
            backgroundColor: "#fff",
          }}
        />
      </Stack>
      <Box 
        width="800px" 
        border="1px solid #333" 
        bgcolor="#f5f5f5" 
        borderRadius="8px"
        sx={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Box 
          width="100%" 
          height="100px" 
          bgcolor="#FFF" 
          display="flex"
          alignItems="center" 
          justifyContent="center"
          borderTopLeftRadius="8px"
          borderTopRightRadius="8px"
      >
        <Typography variant="h2" color = "#333"> 
          Inventory Items
        </Typography>
      </Box>
      <Stack width='100%' height='300px' spacing={2} overflow='auto'>
        {filteredInventory.map(({name, quantity}) => (
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display="flex"
            alignItems="center"
            justifyContent="space-between" 
            bgColor="#f0f0f0"
            padding={5}
            borderRadius="4px"
            boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)"
          >
            <Typography variant = 'h4' color = "#333" textAlign='center'>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant = 'h4' color = "#333" textAlign='center'>
              {quantity}
            </Typography>
            <Stack direction='row' spacing={2}>
              <Button variant = 'contained' onClick={() => addItem(name)} sx={{ bgcolor: '#381A10', color: '#fff' }}>
                Add
              </Button>
              <Button variant = 'contained' onClick={() => removeItem(name)} sx={{ bgcolor: '#381A10', color: '#fff' }}>
                Remove
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
      </Box>
    </Box>
  );
}
