-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2021 a las 21:45:26
-- Versión del servidor: 10.4.18-MariaDB
-- Versión de PHP: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tpfinalentorno`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applicants`
--

CREATE TABLE `applicants` (
  `id` bigint(20) NOT NULL,
  `idUser` bigint(20) NOT NULL,
  `idCompetition` bigint(20) NOT NULL,
  `applicantDate` datetime NOT NULL DEFAULT current_timestamp(),
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `competitions`
--

CREATE TABLE `competitions` (
  `id` bigint(20) NOT NULL,
  `idSubject` bigint(20) NOT NULL,
  `description` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `finalDate` datetime NOT NULL DEFAULT current_timestamp(),
  `state` int(11) NOT NULL,
  `idUser` bigint(20) NOT NULL,
  `idPostion` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curriculum`
--

CREATE TABLE `curriculum` (
  `id` bigint(20) NOT NULL,
  `idPostulant` bigint(20) NOT NULL,
  `document` varchar(500) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documenttype`
--

CREATE TABLE `documenttype` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `state` int(11) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `documenttype`
--

INSERT INTO `documenttype` (`id`, `name`, `description`, `state`, `creationDate`) VALUES
(1, 'DNI', 'El DNI contiene información sobre su identidad. Pero, lo más importante es que este documento tiene un número personal. El número del DNI es necesario para cualquier contrato.', 1, '2021-06-08 00:00:32'),
(2, 'PASAPORTE', 'PASAPORTE', 1, '2021-06-08 00:00:32'),
(3, 'L.C', 'Libreta Cívica', 1, '2021-06-08 00:00:32'),
(4, 'L.E.', 'Libreta de Enrolamiento', 1, '2021-06-08 00:00:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jefedecatedra_materia`
--

CREATE TABLE `jefedecatedra_materia` (
  `Id` bigint(20) NOT NULL,
  `IdJefeDeCatedra` bigint(20) NOT NULL,
  `IdSubject` bigint(20) NOT NULL,
  `State` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `positions`
--

CREATE TABLE `positions` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `positions`
--

INSERT INTO `positions` (`id`, `name`, `description`, `state`) VALUES
(1, 'Jefe de Catedra', 'Se encarga se contralar el buen funccionamienta de la catefra', 1),
(2, 'Titular de Teoria', 'Es el encargado de dictar la parte teorica', 1),
(3, 'Titular de practica', 'Se encarga de la practica', 1),
(4, 'Ayudante teorico', 'Se encargar a apoya el o la profe de la teoria', 1),
(5, 'Ayudante de practica', 'Se encargar a apoya el o la profe de la practica', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `creationDate`, `state`) VALUES
(25, 'admin', 'Tiene todos los permisos', '2021-04-12 02:15:55', 1),
(73, 'Jefe de catedra', 'Tiene acceso su catedra', '2021-06-06 22:39:02', 1),
(74, 'postulante', 'Se puede ver los concoursos, su perfil y aplicar a los concursos', '2021-06-06 22:39:02', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint(20) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(250) COLLATE utf8_unicode_ci NOT NULL,
  `state` int(11) NOT NULL,
  `idUser` bigint(20) NOT NULL,
  `creationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `finalDate` datetime NOT NULL DEFAULT current_timestamp(),
  `img` longtext COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `description`, `state`, `idUser`, `creationDate`, `finalDate`, `img`) VALUES
(4, 'Quimica', 'Es una buena materia', 1, 4, '2021-05-27 22:52:24', '2021-05-27 22:52:24', ''),
(5, 'SO', 'Materia complicada', 1, 4, '2021-05-27 22:54:30', '2021-05-27 22:54:30', ''),
(6, 'Entorno Grafica', 'Muy buena electiva', 1, 4, '2021-05-27 22:55:00', '2021-05-27 22:55:00', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(11) NOT NULL,
  `idRole` bigint(20) NOT NULL,
  `firstName` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `mail` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `address` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `userName` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `userPass` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `creationDate` datetime NOT NULL,
  `finalDate` datetime DEFAULT NULL,
  `state` int(11) NOT NULL,
  `idDocumentType` bigint(20) NOT NULL,
  `docNumber` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `idRole`, `firstName`, `lastName`, `mail`, `address`, `phone`, `userName`, `userPass`, `creationDate`, `finalDate`, `state`, `idDocumentType`, `docNumber`) VALUES
(4, 25, 'con controlador', 'babel', 'prade532@hotmail.com', 'Ov largos', '333333333', 'Jereq', 'ZUVEM0Y4L3M2amFCMjY4TVA1emlpUT09', '0000-00-00 00:00:00', NULL, 1, 1, '93453'),
(5, 73, 'John m', 'Gardel', 'john@gmail.com', 'ov. lagos', '34325', 'Jere516', 'TUZsQkpha3daSEprYXgrK3orQ2FPdz09', '0000-00-00 00:00:00', NULL, 1, 1, '345634'),
(6, 73, 'Prade mod', 'Gardel', 'john1@gmail.com', 'ov. lagos', '3432532', '516prade516', 'TUZsQkpha3daSEprYXgrK3orQ2FPdz09', '0000-00-00 00:00:00', NULL, 1, 1, '19032740');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aplicant_competition` (`idCompetition`);

--
-- Indices de la tabla `competitions`
--
ALTER TABLE `competitions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `competition_subject` (`idSubject`),
  ADD KEY `competition_user` (`idUser`),
  ADD KEY `competition_Position` (`idPostion`);

--
-- Indices de la tabla `curriculum`
--
ALTER TABLE `curriculum`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `documenttype`
--
ALTER TABLE `documenttype`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `jefedecatedra_materia`
--
ALTER TABLE `jefedecatedra_materia`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `JefeDeCatedra_User` (`IdJefeDeCatedra`),
  ADD KEY `Catedra_Subject` (`IdSubject`);

--
-- Indices de la tabla `positions`
--
ALTER TABLE `positions`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `subject_user` (`idUser`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userName` (`userName`),
  ADD UNIQUE KEY `mail` (`mail`),
  ADD KEY `idRole` (`idRole`),
  ADD KEY `user_documentType` (`idDocumentType`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `competitions`
--
ALTER TABLE `competitions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `curriculum`
--
ALTER TABLE `curriculum`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `documenttype`
--
ALTER TABLE `documenttype`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `jefedecatedra_materia`
--
ALTER TABLE `jefedecatedra_materia`
  MODIFY `Id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `positions`
--
ALTER TABLE `positions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `applicants`
--
ALTER TABLE `applicants`
  ADD CONSTRAINT `aplicant_competition` FOREIGN KEY (`idCompetition`) REFERENCES `competitions` (`id`);

--
-- Filtros para la tabla `competitions`
--
ALTER TABLE `competitions`
  ADD CONSTRAINT `competition_Position` FOREIGN KEY (`idPostion`) REFERENCES `positions` (`id`),
  ADD CONSTRAINT `competition_subject` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `competition_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `jefedecatedra_materia`
--
ALTER TABLE `jefedecatedra_materia`
  ADD CONSTRAINT `Catedra_Subject` FOREIGN KEY (`IdSubject`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `JefeDeCatedra_User` FOREIGN KEY (`IdJefeDeCatedra`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subject_user` FOREIGN KEY (`idUser`) REFERENCES `subjects` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `user_documentType` FOREIGN KEY (`idDocumentType`) REFERENCES `documenttype` (`id`),
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`idRole`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
