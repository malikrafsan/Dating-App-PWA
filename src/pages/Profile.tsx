import React, { useEffect, useState, MouseEventHandler } from "react";

import { HeaderProfile, StaticField, InputField, TextAreaField, SelectField, UpdatableImage, UseWarning } from "../components/";
import { BottomNavLayout } from "../layouts";
import { User } from "../api";
import { MdCameraAlt as Camera, MdOutlineAddCircle as Add, MdCancel as Cancel, MdLogout } from "react-icons/md";
import {
  Text,
  Center,
  Image,
  Box,
  Button,
  VStack,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Icon,
} from "@chakra-ui/react";
import { useAuth } from "../context-providers/AuthProvider";

const Profile = () => {
  const { getProfile, updateProfile, updateProfilePhoto, getTags } = User;
  const [state, setState] = useState("VIEW"); // VIEW, EDIT, EDITPHOTO
  const [errorMessage, setErrorMessage] = useState("");
  const [tagValues, setTagValues] = useState([""]);

  const [profileValues, setProfileValues] = useState({
    username: "",
    name: "",
    description: "",
    sex: "",
    age: "",
    dateOfBirth: "",
    tags: [""],
    profileUrl: "",
    userPhoto: ["", "", ""],
  });

  const [editValues, setEditValues] = useState({
    username: "",
    name: "",
    description: "",
    sex: "",
    dateOfBirth: "",
    tags: [""],
  });

  const [editPhotoValues, setEditPhotoValues] = useState({
    profileUrl: new FormData(),
    userPhoto: [new FormData(), new FormData(), new FormData()],
  });

  const {logout} = useAuth();
  const {WarningModal, warning} = UseWarning();

  const sexValues = ["MALE", "FEMALE"];

  useEffect(() => {
    getProfile().then((res) => {
      const data = res.data.user;
      console.log(data);
      setProfileValues({
        username: data.account.username,
        name: data.name,
        description: data.description,
        sex: data.sex,
        age: (new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear()).toString(),
        dateOfBirth: data.dateOfBirth,
        tags: data.userTag.map((tag: { tag: { tag: string; }; }) => tag.tag.tag),
        profileUrl: data.profileUrl,
        userPhoto: data.userPhoto.map((photo: { url: string; }) => photo.url),
      });
      setEditValues({
        username: data.account.username,
        name: data.name,
        description: data.description,
        sex: data.sex,
        dateOfBirth: data.dateOfBirth,
        tags: data.userTag.map((tag: { tag: { tag: string; }; }) => tag.tag.tag),
      });

    });
  }, [state]);

  useEffect(() => {
    getTags().then((res) => {
      setTagValues(res.data.tags.map((tag: { tag: string; }) => tag.tag));
    });
  }, []);

  const handleChangeEdit = (val: string, key: string) => {
    if (key === "dateOfBirth") {
      setEditValues({ ...editValues, [key]: new Date(val).toISOString() });
    } else {
      setEditValues({ ...editValues, [key]: val });
    }
  };

  const handleUpdatePhoto = (val: FormData, key: string) => {
    if (key.includes("userPhoto")) {
      // userPhoto-0, userPhoto-1, userPhoto-2
      const index = parseInt(key.split("-")[1]);
      const userPhoto = editPhotoValues.userPhoto;
      userPhoto[index] = val;
      setEditPhotoValues({ ...editPhotoValues, userPhoto });
    } else {
      // profileUrl
      setEditPhotoValues({ ...editPhotoValues, [key]: val });
    }
  };

  const handleEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    updateProfile(editValues)
      .then((res) => {
        console.log(res.data);
        alert("Your profile updated!");
        setState("VIEW");
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setErrorMessage(err.response.data.message);
        }
      });
  };

  const handleEditPhoto: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    updateProfilePhoto(editPhotoValues)
      .then((res) => {
        console.log(res.data);
        alert("Your profile updated!");
        setState("VIEW");
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setErrorMessage(err.response.data.message);
        }
      });
  };



  const PhotoProfile = () => (
    <Box w="200px" h="200px" position="relative">
      <Image src={profileValues.profileUrl || "/images/blank-profile.png"} alt="profile"
        rounded='full'
        boxSize='200px'
        objectFit='cover'
        border='8px'
        borderColor='blue.secondary'
        boxShadow="0 25px 50px -12px rgba(87, 42, 180, 0.25);"
      />
      <Button
        position='absolute'
        display='flex' justifyContent='center' alignItems='center'
        bottom={4} right={4}
        bg='white' rounded='full' boxShadow='md'
        p={1}
        height='40px' width='40px'
        cursor='pointer'
        onClick={() => setState("EDITPHOTO")}
      >
        <Icon as={Camera} boxSize={6} />
      </Button>
    </Box>
  );

  const dateFormatString = (date : string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const dateFormatStrip = (date : string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    }).split("/").reverse().join("-");
  };


  return (
    <BottomNavLayout noLovesIcon>
      <WarningModal/>
      <Center h="100%" py={20} flexDir="column" justifyContent="flex-start">
        <HeaderProfile state={state} setState={setState} />
        {state === "VIEW" && 
          <>
            <PhotoProfile />
            <VStack mt={4} w="80%">
              <Text fontSize='xl' fontWeight='bold'color="black">{`@${profileValues.username}`}</Text>
              <Text color="gray.900">{profileValues.age} y.o</Text>
              <Text color="gray.900">{profileValues.sex}</Text>
            </VStack>
            <VStack mt={4} w="80%" gap={2} alignItems="flex-start">
              <Text fontSize='xl' fontWeight='bold' color="black">About</Text>
              <StaticField label="Name" value={profileValues.name || ""} />
              <StaticField label="Birthday" value={dateFormatString(profileValues.dateOfBirth) || ""} />
              <StaticField label="Description" value={profileValues.description || ""} />
            </VStack>
            <HStack mt={4} w="80%" h="100%" alignItems="flex-start" flexWrap={"wrap"} columnGap={1} rowGap={1}>
              {profileValues.tags.map((tag, index) => (
                <Tag key={index} bg="blue.primary" color="white" rounded="full" p={2} fontSize="xs" fontWeight="bold">
                  {tag}
                </Tag>
              ))}
            </HStack>
            
            {/* Logout Button */}
            <Button
              mt={4}
              colorScheme="blue"
              rounded='full' 
              boxShadow='md'
              p={4}
              cursor='pointer'
              onClick={() => warning({ title: "Are you sure?", description: "You will be logged out.", onConfirm: () => logout() })}
            >
              Logout&nbsp;
              <Icon as={MdLogout} boxSize={6} />
            </Button>
          </>
        }
        {state === "EDIT" &&
          <>
            <PhotoProfile />
            <VStack mt={4} w="80%" gap={2} alignItems="flex-start">
              <InputField  type="text" label="Username" value={editValues.username} setValue={(val) => handleChangeEdit(val, "username")} errorMessage={errorMessage} />
              <InputField  type="text" label="Name" value={editValues.name} setValue={(val) => handleChangeEdit(val, "name")} />
              <SelectField label="Sex" value={editValues.sex} setValue={(val) => handleChangeEdit(val, "sex")} options={sexValues} />
              <InputField type="date" label="Birthday" value={dateFormatStrip(editValues.dateOfBirth)} setValue={(val) => handleChangeEdit(val, "dateOfBirth")} />
              <TextAreaField label="Description" value={editValues.description} setValue={(val) => handleChangeEdit(val, "description")} />
            </VStack>
            <HStack mt={4} w="80%" h="100%" flexWrap="wrap" columnGap={1} rowGap={1} alignItems="center">
              <Text color="gray.500">Tag: </Text>
              {editValues.tags.map((tag, index) => (
                <Tag key={index} bg="pink.primary" color="white" rounded="full" p={2} fontSize="xs" fontWeight="bold" cursor="pointer"
                  onClick={() => {
                    const newTag = editValues.tags.filter((item) => item !== tag);
                    setEditValues({ ...editValues, tags: newTag });
                  }}
                >
                  <TagLeftIcon as={Cancel} boxSize={4} />
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              ))}
            </HStack>
            <HStack mt={4} w="80%" h="100%" flexWrap="wrap" columnGap={1} rowGap={1} alignItems="center">
              <Text color="gray.500">All: </Text>
              {tagValues.filter((tag) => !editValues.tags.includes(tag)).map((tag, index) => (
                <Tag key={index} bg="blue.primary" color="white" rounded="full" p={2} fontSize="xs" fontWeight="bold" cursor="pointer"
                  onClick={() => {
                    const newTag = [...editValues.tags, tag];
                    setEditValues({ ...editValues, tags: newTag });
                  }}
                >
                  <TagLeftIcon as={Add} boxSize={4} />
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              ))}
            </HStack>
            <Button onClick={handleEdit} w="80%" variant="solidBlue" mt={4}>
              Save
            </Button>
          </>
        }
        {state === "EDITPHOTO" && 
          <>
            <Text>Here is your primay photo</Text>
            <Text>It will be shown on your profile</Text>
            <UpdatableImage id="profileUrl" src={profileValues.profileUrl} isSquare={true} w="250px" h="250px" handleUpdate={handleUpdatePhoto} />
            <HStack mt={4} w="90%" h="100%" gap={1} alignItems="flex-start" justifyContent="space-between">
              <UpdatableImage id="userPhoto-0" src={profileValues.userPhoto[0]} w="150px" h="200px" handleUpdate={handleUpdatePhoto} />
              <UpdatableImage id="userPhoto-1" src={profileValues.userPhoto[1]} w="150px" h="200px" handleUpdate={handleUpdatePhoto} />
              <UpdatableImage id="userPhoto-2" src={profileValues.userPhoto[2]} w="150px" h="200px" handleUpdate={handleUpdatePhoto} />
            </HStack>
            <Text>{"Don't use "}<b>{"other people's"}</b>{" photos!"}</Text>
            <Text fontSize="sm" color="gray.500">{"Are you sure that's the best photo you got?"}</Text>
            <Button onClick={handleEditPhoto} w="80%" variant="solidBlue">
              Sure!
            </Button>
          </>
        }
      </Center>
    </BottomNavLayout>
  );
};


export default Profile;