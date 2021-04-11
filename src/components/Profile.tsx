import styles from '../styles/components/Profile.module.css'

export function Profile() {
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/Thiago-Fers7.png" alt="Foto Perfil"/>
            <div>
                <strong>Luiz Thiago</strong>
                <p>
                    <img src="icons/level.svg" alt="Level" />
                    Level 1</p>
            </div>
        </div>
    );
}