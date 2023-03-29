import React, { useEffect, useState, MouseEventHandler } from "react";

import { HeaderProfile, StaticField, InputField, TextAreaField, SelectField, UpdatableImage, UseWarning, FullPageLoading } from "../components/";
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
            : "/images/blank-profile.png"
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

  const { logout } = useAuth();
  const { WarningModal, warning } = UseWarning();

  const sexValues = ["MALE", "FEMALE"];

  useEffect(() => {
    getTags().then((res) => {
      setTagValues(res.data.tags.map((tag: { tag: string }) => tag.tag));
    });
    getSelfProfile().then((res) => {
      setEditValues({
        username: res.data.user.account.username,
        name: res.data.user.name,
        description: res.data.user.description,
        sex: res.data.user.sex,
        dateOfBirth: new Date(res.data.user.dateOfBirth),
        tags: res.data.user.userTag.map((tagData) => tagData.tag.tag),
      });
      setProfileValues(res.data);
    });
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
        });
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          alert(err.response.data.message); // FIXME: Change this to "Something went wrong"
        }
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

  if (!profileValues || !photoValues) return <FullPageLoading />;

  return (
    <BottomNavLayout noLovesIcon>
      <WarningModal />
      <Center h="100%" py={20} flexDir="column" justifyContent="flex-start">
        <HeaderProfile state={state} setState={setState} />
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
              <Text color="gray.900">{profileValues.user.sex}</Text>
              <Text color="gray.900">{profileValues.user.university.name}</Text>
            </VStack>
            <VStack mt={4} w="80%" gap={2} alignItems="flex-start">
              <Text fontSize="xl" fontWeight="bold" color="black">
                About
              </Text>
              <StaticField label="Name" value={profileValues.user.name || ""} />
              <StaticField
                label="Birthday"
                value={dateFormatString(profileValues.user.dateOfBirth) || ""}
              />
              <StaticField
                label="Description"
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
                })
              }
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
                label="Name"
                value={editValues.name}
                setValue={(val) => handleChangeEdit(val, "name")}
              />
              <SelectField
                label="Gender"
                value={editValues.sex}
                setValue={(val) => handleChangeEdit(val, "sex")}
                options={sexValues}
              />
              <InputField
                type="date"
                label="Birthday"
                value={dateFormatStrip(editValues.dateOfBirth)}
                setValue={(val) => handleChangeEdit(val, "dateOfBirth")}
              />
              <TextAreaField
                label="Description"
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
            <Button onClick={handleEdit} w="80%" variant="solidBlue" mt={4}>
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
