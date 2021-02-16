import React, { useEffect, useState } from "react";
import { tvApi } from '../api';
import styled from "styled-components";
import Section from "../Components/Section";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import Poster from "../Components/Poster";

const Container = styled.div`
  padding: 0px 20px;
`;

export default function TV() {
    const [topRated, setTopRated] = useState(null);
    const [popular, setPopular] = useState(null);
    const [airingToday, setAiringToday] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data: { results: topRated } } = await tvApi.topRated();
                const { data: { results: popular } } = await tvApi.popular();
                const { data: { results: airingToday } } = await tvApi.airingToday();

                setTopRated(topRated);
                setPopular(popular);
                setAiringToday(airingToday);

            } catch {
                setError("Can't find a TV program")
            } finally {
                setLoading(false)
            }
        };
        fetchData();
        // eslint-disable-next-line
    }, [])

    return loading ? (
        <Loader />
    ) : (
            <Container>
                {topRated && topRated.length > 0 && (
                    <Section title="Top Rated Shows">
                        {topRated.map(show => (
                            <Poster
                                key={show.id}
                                id={show.id}
                                imageUrl={show.poster_path}
                                title={show.original_name}
                                rating={show.vote_average}
                                year={show.first_air_date.substring(0, 4)}
                            />
                        ))}
                    </Section>
                )}
                {popular && popular.length > 0 && (
                    <Section title="Popular Shows">
                        {popular.map(show => (
                            <Poster
                                key={show.id}
                                id={show.id}
                                imageUrl={show.poster_path}
                                title={show.original_name}
                                rating={show.vote_average}
                                year={show.first_air_date.substring(0, 4)}
                            />
                        ))}
                    </Section>
                )}
                {airingToday && airingToday.length > 0 && (
                    <Section title="Airing Today">
                        {airingToday.map(show => (
                            <Poster
                                key={show.id}
                                id={show.id}
                                imageUrl={show.poster_path}
                                title={show.original_name}
                                rating={show.vote_average}
                                year={show.first_air_date.substring(0, 4)}
                            />
                        ))}
                    </Section>
                )}
                {error && <Message color="#e74c3c" text={error} />}
            </Container>
        );

}