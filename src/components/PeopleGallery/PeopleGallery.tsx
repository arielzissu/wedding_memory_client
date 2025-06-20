import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import { fetchPeople } from "api/r2Upload";
import { IPeople, IR2File } from "types";
import {
  FaceCard,
  FaceGrid,
  PeopleFaceImg,
  WrapLoader,
} from "./PeopleGallery.style";
import PhotoDisplayGrid from "components/PhotoDisplayGrid/PhotoDisplayGrid";

interface PeopleGalleryProps {
  files: IR2File[];
  userEmail: string | undefined;
  relevantFile: string;
}

const PeopleGallery: React.FC<PeopleGalleryProps> = ({
  files,
  userEmail,
  relevantFile,
}) => {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedPersonId, setSelectedPersonId] = useState<null | string>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPerson = people.find((p) => p.personId === selectedPersonId);

  const fetchPeopleData = async () => {
    setIsLoading(true);
    const peopleRes = await fetchPeople(userEmail, relevantFile);
    setIsLoading(false);
    setPeople(peopleRes);
  };

  useEffect(() => {
    fetchPeopleData();
  }, [files.length]);

  const renderPersonCard = (person) => {
    if (!person.mediaFiles?.length) return null;
    return (
      <FaceCard
        key={person.personId}
        onClick={() => setSelectedPersonId(person.personId)}
      >
        <PeopleFaceImg src={person.sampleThumbnail} alt="Face" />
        <Typography variant="body2">
          {person.faceCount} Photo{person.faceCount > 1 ? "s" : ""}
        </Typography>
      </FaceCard>
    );
  };

  const renderMediaGrid = (mediaFiles) => {
    return (
      <PhotoDisplayGrid
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        files={mediaFiles}
        setFiles={() => {}}
      />
    );
  };

  if (isLoading) {
    return (
      <WrapLoader>
        <CircularProgress size={60} />
      </WrapLoader>
    );
  }

  if (!people.length) {
    return <Typography variant="h6">No people found.</Typography>;
  }

  return (
    <div>
      {!selectedPersonId ? (
        <FaceGrid>{people.map((person) => renderPersonCard(person))}</FaceGrid>
      ) : (
        <div>
          <Button onClick={() => setSelectedPersonId(null)} sx={{ mb: 2 }}>
            ← Back to all people
          </Button>
          {renderMediaGrid(selectedPerson?.mediaFiles)}
        </div>
      )}
    </div>
  );
};

export default PeopleGallery;
