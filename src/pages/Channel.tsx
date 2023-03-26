import React, { useEffect, useState } from "react";
import { BottomNavLayout } from "../layouts";
import {
  getUniversity,
  getUniversities,
  createUniveristy,
  updateUniversity,
  updateUniversityLogo,
  deleteUniversity,
  deleteUniversityLogo,
} from "../api/channel";
import { UniversityType } from "../types/response";
import { Button, Divider } from "@chakra-ui/react";
import {UpdatableImage} from "../components";

const Channel = () => {
  const [universities, setUniversities] = useState<UniversityType[]>([]);
  const [slug, setSlug] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [logo, setLogo] = useState<FormData>();
  const [logoUrl, setLogoUrl] = useState<string>("");

  const onMount = async () => {
    const {data} = await getUniversities();
    setUniversities(data.universities);
  };

  useEffect(() => {
    onMount();
  }, []);

  const handleUpdatePhoto = (val: FormData, _: string) => {
    setLogo(val);
  };

  return (
    <BottomNavLayout>
      <div>
        <div>
          <h1>Channel</h1>
          <div>
            <label htmlFor="slug">slug: </label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} />
          </div>
          <div>
            <label htmlFor="name">name: </label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="logo">logo: </label>
            <UpdatableImage id="logo" src={`https://drive.google.com/uc?export=view&id=${logoUrl}`} isSquare={true} w="250px" h="250px" handleUpdate={handleUpdatePhoto} />
          </div>
        </div>
        <Divider style={{margin: "10px 0"}} />
        <div>
          <h1>get all universities</h1>
          <ul>
            {universities.map((university) => (
              <li key={university.slug}>
                {university.slug} - {university.name} - {university.logoFileId} - {university.channelId}
              </li>
            ))}
          </ul>
        </div>
        <Divider style={{margin: "10px 0"}} />
        <div>
          <h1>get university</h1>
          <Button
            onClick={async () => {
              const {data} = await getUniversity(slug);
              setLogoUrl(data.university.logoFileId);
              alert(JSON.stringify(data));
            }}
          >
                        BTN get university
          </Button>
        </div>
        <Divider style={{margin: "10px 0"}} />
        <div>
          <h1>Create university</h1>
          <Button
            onClick={async () => {
              const {data} = await createUniveristy(name);
              alert(JSON.stringify(data));
            }}
          >
                        BTN create university
          </Button>
        </div>
        <Divider style={{margin: "10px 0"}} />
        <div>
          <h1>Update university Name</h1>
          <Button
            onClick={async () => {
              const {data} = await updateUniversity(slug, {name});
              alert(JSON.stringify(data));
            }}
          >
                        BTN update university name
          </Button>
        </div>
        <Divider style={{margin: "10px 0"}} />
        <div>
          <h1>Update university Logo</h1>
          <Button
            onClick={async () => {
              if (!logo) {
                alert("no logo");
                return;
              }

              const {data} = await updateUniversityLogo(slug, logo);
              alert(JSON.stringify(data));
            }}
          >
                        BTN update university logo
          </Button>
        </div>
        <Divider style={{margin: "10px 0"}} />
        <div>
          <h1>Delete university</h1>
          <Button
            onClick={async () => {
              const {data} = await deleteUniversity(slug);
              alert(JSON.stringify(data));
            }}
          >
                        BTN delete university
          </Button>
        </div>
        <Divider style={{margin: "10px 0"}} />
        <div>
          <h1>Delete university logo</h1>
          <Button
            onClick={async () => {
              const {data} = await deleteUniversityLogo(slug);
              alert(JSON.stringify(data));
            }}
          >
                        BTN delete university logo
          </Button>
        </div>
      </div>
    </BottomNavLayout>
  );
};

export default Channel;