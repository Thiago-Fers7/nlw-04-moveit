import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'

// Tipagens
interface Challenge {
    type: 'body' | 'eye',
    description: string,
    amount: number
}

interface ChallengesContextData {
    level: number,
    totalExperience: number;
    currentExperience: number,
    experienceToNextLevel: number;
    challengesCompleted: number,
    activeChallenge: Challenge,
    levelUp: () => void,
    startNewChallenge: () => void,
    resetChallenge: () => void
    completeChallenge: () => void
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    totalExperience: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ 
    children, 
    ...rest
}: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [totalExperience, setTotalExperience] = useState(rest.totalExperience ?? 0)

    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(currentExperience))
        Cookies.set('challengesCompleted', String(challengesCompleted))
        Cookies.set('totalExperience', String(totalExperience))
    }, [level, currentExperience, challengesCompleted, totalExperience])

    function levelUp() {
        setLevel(level + 1)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio', { 
                body: `Valendo ${challenge.amount}xp`
             })

            new Audio('/notification.mp3').play()
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }   

        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount
        setTotalExperience(totalExperience + amount)

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider value={{
            level,
            totalExperience,
            currentExperience,
            experienceToNextLevel,
            challengesCompleted,
            levelUp,
            startNewChallenge,
            activeChallenge,
            resetChallenge,
            completeChallenge
        }}>
            {children}
        </ChallengesContext.Provider>
    );
}