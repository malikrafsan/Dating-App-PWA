import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { useCallback, useEffect } from "react";

import { BottomNavLayout } from "../layouts";
import Match, { MatchData } from "./Match";
import PairCard, { PairData } from "../components/Pair/PairCard";
import { Pair as PairAPI } from "../api";

const maxCard = 5;

const Pair = () => {
  const [showMatch, setShowMatch] = React.useState(false);
  const [matchData, setMatchData] = React.useState<undefined|MatchData>(undefined);
  const [data, setData] = React.useState<undefined|Array<PairData>>(undefined);
  const [fetchCount, setFetchCount] = React.useState(0);
  const [isDone, setIsDone] = React.useState(false);
  
  const onPair = useCallback((id: number, isPair: boolean) => {
    // remove first item
    setData((prev) => prev?.slice(1).reverse());
    // work in background
    setFetchCount((prev) => (prev + 1));
    if (isPair) {
      PairAPI.acceptPair(id).then((res) => {
        const m = res?.data?.pair;
        if (m?.match) {
          const match = m.match;
          setMatchData({
            pairedId: match.user2.id,
            pairedName: match.user2.name,
            pairedAva: match.user2.userPhoto.find((p: any) => p.index === 0).fileId,
            meAva: match.user1.userPhoto.find((p: any) => p.index === 0).fileId,
          });
          setShowMatch(true);
        }
        setFetchCount((prev) => (prev - 1));
      });
    } else {
      PairAPI.rejectPair(id).then(() => {
        setFetchCount((prev) => (prev - 1));
      });
    }
  }, [data, setData, setShowMatch]);

  useEffect(() => {
    if (
      !isDone &&
      (data === undefined || data?.length === 0) &&
      fetchCount === 0
    ) {
      PairAPI.getPair(maxCard).then((res) => {
        const pairs = res.data.pairs;
        if (pairs.length === 0)
          setIsDone(true);
        setData(res.data.pairs);
      });
    }
  }, [isDone, data, setData, fetchCount]);

  return (
    <BottomNavLayout>
      <Match data={matchData} show={showMatch} setShow={setShowMatch} />
      <Box
        p="14"
        h="full" w="full"
        position="relative"
        boxSizing="border-box"
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        {
          data && ((
            data.length > 0 &&
            <PairCard
              data={data[0]}
              onPair={onPair}
            />
          ) || ( isDone && (
            <Text>
              No more pairs!
            </Text>
          ) || (
            <Spinner />
          )
          )) || (
            <Spinner />
          )
        }
      </Box>
    </BottomNavLayout>
  );
};

export default Pair;
