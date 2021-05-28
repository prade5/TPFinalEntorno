-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2021 a las 05:27:12
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

--
-- Volcado de datos para la tabla `applicants`
--

INSERT INTO `applicants` (`id`, `idUser`, `idCompetition`, `applicantDate`, `state`) VALUES
(1, 4, 3, '2021-04-24 03:00:00', 1),
(2, 4, 2, '2021-04-24 03:00:00', 1);

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
  `idUser` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `competitions`
--

INSERT INTO `competitions` (`id`, `idSubject`, `description`, `creationDate`, `finalDate`, `state`, `idUser`) VALUES
(1, 6, 'Muy buena electiva', '2021-05-27 23:12:58', '2021-05-27 23:12:58', 1, 4),
(2, 4, 'Muy buena electiva', '2021-05-27 23:14:16', '2021-05-27 23:14:16', 1, 4),
(3, 4, 'Muy buena electiva', '2021-05-27 23:15:36', '2021-05-27 23:15:36', 2, 4);

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
(26, 'Pradel Admin modificado con ', 'Role Pradel', '2021-04-12 02:19:16', 2),
(27, 'Itati gonano new', 'asadsdasdasdasd', '2021-04-12 02:19:59', 1),
(28, 'probar message', 'probar message', '2021-04-12 22:11:08', 1),
(29, 'probar message 2', 'probar message', '2021-04-12 22:12:40', 1),
(30, 'probar message 2', 'probar message', '2021-04-12 22:13:02', 1),
(31, 'probar message 2', 'probar message', '2021-04-12 22:13:19', 1),
(32, 'probar message 2', 'probar message', '2021-04-12 22:13:43', 1),
(33, 'probar message 2', 'probar message', '2021-04-12 22:13:50', 1),
(34, 'kslfjsdkfjsdklfsjdflksdfjsdlkfjsd', 'kslfjsdkfjsdklfsjdflksdfjsdlkfjsd', '2021-04-12 22:14:35', 1),
(35, 'kslfjsdkfjsdklfsjdflksdfjsdlkfjsd', 'czxczxczxczxc', '2021-04-12 22:16:22', 1),
(36, 'kslfjsdkfjsdklfsjdflksdfjsdlkfjsd', 'zxczxcz', '2021-04-12 22:34:27', 1),
(37, 'Itati gonano', 'sdfsdfsdfsdf', '2021-04-12 22:34:41', 1),
(38, 'Itati gonano', 'dfgdfgdfgdfg', '2021-04-12 22:40:32', 1),
(39, 'sdfsdfsdf', 'sdfsdfsdfsdf', '2021-04-12 22:41:01', 1),
(40, 'dfsdfsdf', 'sdfsdfsdfsdf', '2021-04-12 22:41:22', 1),
(41, 'sdfsdf', '', '2021-04-17 18:27:06', 1),
(42, 'sdfsdf', '', '2021-04-17 18:27:06', 1),
(43, 'sdfsdf', '', '2021-04-17 18:27:07', 1),
(44, 'sdfsdf', '', '2021-04-17 18:27:07', 1),
(45, 'sdfsdf', '', '2021-04-17 18:27:08', 1),
(46, 'sdfsdfsdfsdf', '', '2021-04-17 19:00:19', 1),
(47, '', '', '2021-04-17 21:48:34', 1),
(48, 'nuevo', '', '2021-04-19 04:14:42', 1),
(49, '', '', '2021-04-28 02:12:20', 1),
(50, '', '', '2021-04-28 02:13:22', 1),
(51, '', '', '2021-04-28 21:19:16', 1),
(52, '', '', '2021-04-28 21:40:21', 1),
(53, '', '', '2021-04-28 21:44:31', 1),
(54, '', '', '2021-04-28 21:49:31', 1),
(55, '', '', '2021-04-28 22:07:17', 1),
(56, 'Pradel', 'Role Pradel', '2021-04-28 22:14:53', 1),
(57, 'Pradel', 'Role Pradel', '2021-04-28 22:18:11', 1),
(58, 'Pradel', 'Role Pradel', '2021-04-28 22:38:04', 1),
(59, 'Pradel', 'Role Pradel', '2021-04-28 22:38:05', 1),
(60, 'Pradel', 'Role Pradel', '2021-04-28 22:39:12', 1),
(61, 'Pradel', 'Role Pradel', '2021-04-28 22:39:56', 2),
(62, 'Pradel Eugene', 'Role Pradel', '2021-04-28 22:40:25', 2),
(63, 'Pradel Eugene', 'Role Pradel', '2021-04-28 22:42:26', 2),
(64, 'Pradel Eugene Modificado', 'Role Pradel', '2021-04-28 22:42:58', 2),
(65, 'Admin actualizado con el nuevo api', 'Tiene todos los permisos', '2021-04-28 23:15:04', 2),
(66, 'Admin actualizado con el nuevo api', 'Tiene todos los permisos', '2021-04-28 23:16:52', 2),
(67, 'desde el nuevo api con cors', '', '2021-04-29 00:03:45', 2),
(68, 'Pradel Admin modificado con rest', 'Role Pradel', '2021-05-04 01:02:45', 2),
(69, 'Admin 2', 'fdsfsdfsd', '2021-05-16 13:52:40', 2),
(70, 'Admin 23', 'fdsfsdfsd', '2021-05-16 13:52:58', 2),
(71, 'Pradel Admin actualizado', 'asdasdasd', '2021-05-16 13:57:58', 2),
(72, 'Pradele', '', '2021-05-16 14:06:28', 2);

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
  `finalDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `subjects`
--

INSERT INTO `subjects` (`id`, `name`, `description`, `state`, `idUser`, `creationDate`, `finalDate`) VALUES
(4, 'Quimica', 'Es una buena materia', 1, 4, '2021-05-27 22:52:24', '2021-05-27 22:52:24'),
(5, 'SO', 'Materia complicada', 1, 4, '2021-05-27 22:54:30', '2021-05-27 22:54:30'),
(6, 'Entorno Grafica', 'Muy buena electiva', 1, 4, '2021-05-27 22:55:00', '2021-05-27 22:55:00');

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
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `idRole`, `firstName`, `lastName`, `mail`, `address`, `phone`, `userName`, `userPass`, `creationDate`, `finalDate`, `state`) VALUES
(4, 25, 'con controlador', 'babel', 'prade532@hotmail.com', 'Ov largos', '333333333', 'Jereq', 'ZUVEM0Y4L3M2amFCMjY4TVA1emlpUT09', '0000-00-00 00:00:00', NULL, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `competitions`
--
ALTER TABLE `competitions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `competition_subject` (`idSubject`),
  ADD KEY `competition_user` (`idUser`);

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
  ADD KEY `idRole` (`idRole`);

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
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `competitions`
--
ALTER TABLE `competitions`
  ADD CONSTRAINT `competition_subject` FOREIGN KEY (`idSubject`) REFERENCES `subjects` (`id`),
  ADD CONSTRAINT `competition_user` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subject_user` FOREIGN KEY (`idUser`) REFERENCES `subjects` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`idRole`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
