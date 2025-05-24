import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { fetchPeople } from "api/r2Upload";
import { IPeople, IR2File } from "types";
import { FaceCard, FaceGrid, PeopleFaceImg } from "./PeopleGallery.style";
import PhotoDisplayGrid from "components/PhotoDisplayGrid/PhotoDisplayGrid";

interface PeopleGalleryProps {
  files: IR2File[];
}

const PeopleGallery: React.FC<PeopleGalleryProps> = ({ files }) => {
  const [people, setPeople] = useState<IPeople[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<null | string>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedPerson = people.find((p) => p.personId === selectedPersonId);

  const fetchPeopleData = async () => {
    const peopleRes = await fetchPeople();
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
        <Typography variant="body2">{person.faceCount} faces</Typography>
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
