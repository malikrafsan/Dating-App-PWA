import React, { useEffect, useState, MouseEventHandler } from "react";

import { HeaderProfile, StaticField, InputField, DropdownField, TextAreaField, UpdatableImage, UseWarning, FullPageLoading, FullPageError } from "../components/";
import { BottomNavLayout } from "../layouts";
import { User } from "../api";
import {
  MdCameraAlt as Camera,
  MdOutlineAddCircle as Add,
  MdCancel as Cancel,
  MdLogout,
} from "react-icons/md";
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
import { ProfileData } from "../types/response";

interface PhotoProfileProps {
  setState: (state: string) => void;
  mainPhoto: string | null;
}

const PhotoProfile = ({ setState, mainPhoto }: PhotoProfileProps) => {
  return (
    <Box w="200px" h="200px" position="relative">
      <Image
        src={
          mainPhoto
            ? `https://drive.google.com/uc?export=view&id=${mainPhoto}`
            : "/images/blank_profile.png"
        }
        alt="profile"
        rounded="full"
        boxSize="200px"
        objectFit="cover"
        border="8px"
        borderColor="blue.secondary"
        boxShadow="0 25px 50px -12px rgba(87, 42, 180, 0.25);"
      />
      <Button
        position="absolute"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bottom={4}
        right={4}
        bg="white"
        rounded="full"
        boxShadow="md"
        p={1}
        height="40px"
        width="40px"
        cursor="pointer"
        onClick={() => setState("EDITPHOTO")}
      >
        <Icon as={Camera} boxSize={6} />
      </Button>
    </Box>
  );
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { getSelfProfile, updateProfile, updateProfilePhoto, deleteProfilePhoto, getTags } = User;
  const [state, setState] = useState("VIEW"); // VIEW, EDIT, EDITPHOTO
  const [tagValues, setTagValues] = useState([""]);

  const [profileValues, setProfileValues] = useState<ProfileData>();
  // Sorts userPhotos by index smallest to largest and maps to fileId
  const photoValues = profileValues?.user.userPhoto.reduce(
    (acc: string[], photo) => {
      acc[photo.index] = photo.fileId;
      return acc;
    },
    ["", "", "", ""]
  );

  const [editValues, setEditValues] = useState({
    username: "",
    name: "",
    description: "",
    sex: "",
    dateOfBirth: new Date(),
    tags: [""],
  });

  const [editPhotoValues, setEditPhotoValues] = useState<
    [File | null | undefined, File | null | undefined, File | null | undefined, File | null | undefined]
  >([undefined, undefined, undefined, undefined]);
  const [isUploading, setIsUploading] = useState(false);

  const { logout } = useAuth();
  const { WarningModal, warning } = UseWarning();

  const sexValues = ["MALE", "FEMALE"];

  const getInitValues = async () => {
    setIsLoading(true);
    try {
      const tagRes = await getTags();
      setTagValues(tagRes.data.tags.map((tag: { tag: string }) => tag.tag));

      const profileRes = await getSelfProfile();
      setEditValues({
        username: profileRes.data.user.account.username,
        name: profileRes.data.user.name,
        description: profileRes.data.user.description,
        sex: profileRes.data.user.sex,
        dateOfBirth: new Date(profileRes.data.user.dateOfBirth),
        tags: profileRes.data.user.userTag.map((tagData) => tagData.tag.tag),
      });
      setProfileValues(profileRes.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { 
    getInitValues();
  }, []);

  const handleChangeEdit = (val: string, key: string) => {
    setEditValues({ ...editValues, [key]: val });
  };

  const handleChangePhoto = (val: File | null | undefined, key: string) => {
    setEditPhotoValues((old) => {
      const newPhoto = old;
      newPhoto[Number(key)] = val;
      return newPhoto;
    });
  };

  const handleEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    updateProfile(
      editValues.name,
      editValues.description,
      editValues.dateOfBirth,
      undefined,
      undefined,
      editValues.sex as "MALE" | "FEMALE",
      editValues.tags
    )
      .then((_) => {
        getSelfProfile().then((res) => {
          setProfileValues(res.data);
          setState("VIEW");
        });
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          alert(err.response.data.message); // FIXME: Change this to "Something went wrong"
        }
      });
  };

  const handleEditPhoto: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsUploading(true);
    e.preventDefault();
    const deletedPhotos = editPhotoValues.map((photo, index) => {
      return profileValues?.user.userPhoto.map((photo) => photo.index).includes(index) && photo === null;
    }).reduce((acc: number[], photo, index) => {
      if (photo) {
        acc.push(index);
      }
      return acc;
    }, []);
    Promise.all([
      deleteProfilePhoto(deletedPhotos),
      updateProfilePhoto(editPhotoValues)
    ])
      .then((_) => {
        getSelfProfile().then((res) => {
          setProfileValues(res.data);
          setEditPhotoValues([undefined, undefined, undefined, undefined]);
          setState("VIEW");
          setIsUploading(false);
        });
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          alert(err.response.data.message); // FIXME: Change this to "Something went wrong"
        }
        setIsUploading(false);
      });
  };

  
  const dateFormatString = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const dateFormatStrip = (date: string | Date) => {
    return new Date(date)
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
      .split("/")
      .reverse()
      .join("-");
  };

  if (isLoading) {
    console.log("loading");
    return <FullPageLoading />;
  } else if (!isLoading && !profileValues)  {
    console.log("error");
    return <FullPageError message="Something went wrong. Please try again later." />;
  }
  
  return (
    <BottomNavLayout noLovesIcon>
      <WarningModal />
      <Center h="100%" py={20} flexDir="column" justifyContent="flex-start">
        <HeaderProfile state={state} setState={setState} />
        {isUploading && (
          <Box
            w="100%"
            h="auto"
            position= "absolute"
            zIndex= "100"
            background= "rgba(255, 255, 255, 0.5)"
            left= "0"
            top= "0"
          >
            <FullPageLoading />
          </Box>
        )}
        {state === "VIEW" && (
          <>
            <PhotoProfile setState={setState} mainPhoto={photoValues[0]} />
            <VStack mt={4} w="80%">
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="black"
              >{`@${profileValues.user.account.username}`}</Text>
              <Text color="gray.900">
                {new Date().getFullYear() -
                  new Date(profileValues.user.dateOfBirth).getFullYear()}{" "}
                y.o
              </Text>
              <Text id="profile-sex" color="gray.900">{profileValues.user.sex}</Text>
              <Text id="profile-univ" color="gray.900">{profileValues.user.university?.name}</Text>
            </VStack>
            <VStack mt={4} w="80%" gap={2} alignItems="flex-start">
              <Text fontSize="xl" fontWeight="bold" color="black">
                About
              </Text>
              <StaticField id="profile-name" label="Name" value={profileValues.user.name || ""} />
              <StaticField
                label="Birthday"
                id="profile-birthday"
                value={dateFormatString(profileValues.user.dateOfBirth) || ""}
              />
              <StaticField
                label="Description"
                id="profile-desc"
                value={profileValues.user.description || ""}
              />
            </VStack>
            <HStack
              mt={4}
              w="80%"
              h="100%"
              alignItems="flex-start"
              flexWrap={"wrap"}
              columnGap={1}
              rowGap={1}
            >
              {profileValues.user.userTag.map((tagData, index) => (
                <Tag
                  key={index}
                  bg="blue.primary"
                  color="white"
                  rounded="full"
                  p={2}
                  fontSize="xs"
                  fontWeight="bold"
                >
                  {tagData.tag.tag}
                </Tag>
              ))}
            </HStack>

            {/* Logout Button */}
            <Button
              mt={4}
              colorScheme="blue"
              rounded="full"
              boxShadow="md"
              p={4}
              cursor="pointer"
              onClick={() =>
                warning({
                  title: "Are you sure?",
                  description: "You will be logged out.",
                  onConfirm: () => logout(),
                  id: "profile-warning-modal",
                })
              }
              id="profile-logout-btn"
            >
              Logout&nbsp;
              <Icon as={MdLogout} boxSize={6} />
            </Button>
          </>
        )}
        {state === "EDIT" && (
          <>
            <PhotoProfile setState={setState} mainPhoto={photoValues[0]} />
            <VStack mt={4} w="80%" gap={2} alignItems="flex-start">
              <InputField
                type="text"
                id="profile-name-input"
                label="Name"
                value={editValues.name}
                setValue={(val) => handleChangeEdit(val, "name")}
              />
              <DropdownField 
                label="Gender"
                id="profile-sex-input"
                value={editValues.sex}
                onChange={(val) => {
                  if (!val) {
                    handleChangeEdit("MALE", "sex");
                    return;
                  }

                  handleChangeEdit(val.value, "sex");
                }}
                options={sexValues}
              />
              <InputField
                type="date"
                id="profile-birthday-input"
                label="Birthday"
                value={dateFormatStrip(editValues.dateOfBirth)}
                setValue={(val) => handleChangeEdit(val, "dateOfBirth")}
              />
              <TextAreaField
                label="Description"
                id="profile-desc-input"
                value={editValues.description}
                setValue={(val) => handleChangeEdit(val, "description")}
              />
            </VStack>
            <HStack
              mt={4}
              w="80%"
              h="100%"
              flexWrap="wrap"
              columnGap={1}
              rowGap={1}
              alignItems="center"
            >
              <Text color="gray.500">Tag: </Text>
              {editValues.tags.map((tag, index) => (
                <Tag
                  key={index}
                  bg="pink.primary"
                  color="white"
                  rounded="full"
                  p={2}
                  id={"profile-selected-tag-" + index}
                  fontSize="xs"
                  fontWeight="bold"
                  cursor="pointer"
                  onClick={() => {
                    const newTag = editValues.tags.filter(
                      (item) => item !== tag
                    );
                    setEditValues({ ...editValues, tags: newTag });
                  }}
                >
                  <TagLeftIcon as={Cancel} boxSize={4} />
                  <TagLabel>{tag}</TagLabel>
                </Tag>
              ))}
            </HStack>
            <HStack
              mt={4}
              w="80%"
              h="100%"
              flexWrap="wrap"
              columnGap={1}
              rowGap={1}
              alignItems="center"
            >
              <Text color="gray.500">All: </Text>
              {tagValues
                .filter((tag) => !editValues.tags.includes(tag))
                .map((tag, index) => (
                  <Tag
                    key={index}
                    bg="blue.primary"
                    color="white"
                    rounded="full"
                    p={2}
                    id={"profile-all-tag-" + index}
                    fontSize="xs"
                    fontWeight="bold"
                    cursor="pointer"
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
            <Button id="profile-save-btn" onClick={handleEdit} w="80%" variant="solidBlue" mt={4}>
              Save
            </Button>
          </>
        )}
        {state === "EDITPHOTO" && (
          <>
            <Text>Here is your primary photo</Text>
            <Text>It will be shown on your profile</Text>
            <UpdatableImage
              id="photo_0"
              src={
                photoValues[0]
                  ? `https://drive.google.com/uc?export=view&id=${photoValues[0]}`
                  : ""
              }
              isSquare={true}
              w="250px"
              h="250px"
              handleUpdate={(file) => handleChangePhoto(file, "0")}
            />
            <HStack
              mt={4}
              w="90%"
              h="100%"
              gap={1}
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <UpdatableImage
                id="photo_1"
                src={
                  photoValues[1]
                    ? `https://drive.google.com/uc?export=view&id=${photoValues[1]}`
                    : ""
                }
                w="150px"
                h="200px"
                handleUpdate={(file) => handleChangePhoto(file, "1")}
              />
              <UpdatableImage
                id="photo_2"
                src={
                  photoValues[2]
                    ? `https://drive.google.com/uc?export=view&id=${photoValues[2]}`
                    : ""
                }
                w="150px"
                h="200px"
                handleUpdate={(file) => handleChangePhoto(file, "2")}

              />
              <UpdatableImage
                id="photo_3"
                src={
                  photoValues[3]
                    ? `https://drive.google.com/uc?export=view&id=${photoValues[3]}`
                    : ""
                }
                w="150px"
                h="200px"
                handleUpdate={(file) => handleChangePhoto(file, "3")}
              />
            </HStack>
            <Text>
              {"Don't use "}
              <b>{"other people's"}</b>
              {" photos!"}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {"Are you sure that's the best photo you got?"}
            </Text>
            <Button onClick={handleEditPhoto} w="80%" variant="solidBlue">
              Sure!
            </Button>
          </>
        )}
      </Center>
    </BottomNavLayout>
  );
};

export default Profile;
