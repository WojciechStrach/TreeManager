-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 02 Maj 2018, 16:54
-- Wersja serwera: 10.1.31-MariaDB
-- Wersja PHP: 7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `treemanager`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `nodelist`
--

CREATE TABLE `nodelist` (
  `ID` int(11) NOT NULL,
  `LABEL` text COLLATE utf8_polish_ci NOT NULL,
  `ANCESTOR` int(11) DEFAULT NULL,
  `ASSIGNMENT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `nodelist`
--

INSERT INTO `nodelist` (`ID`, `LABEL`, `ANCESTOR`, `ASSIGNMENT`) VALUES
(1, 'Rodzaje', NULL, 1),
(2, 'Spalinowe', 1, 1),
(3, 'Elektryczne', 1, 1),
(4, 'Tesla', 3, 1),
(5, 'Ford', 2, 1),
(6, 'Fiat', 2, 1),
(7, 'Model3', 4, 1),
(8, 'Opel', 2, 1),
(9, 'ModelX', 4, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `treelist`
--

CREATE TABLE `treelist` (
  `ID` int(11) NOT NULL,
  `TreeName` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `treelist`
--

INSERT INTO `treelist` (`ID`, `TreeName`) VALUES
(1, 'Samochody'),
(5, 'Elektronika');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `nodelist`
--
ALTER TABLE `nodelist`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ASSIGNMENT` (`ASSIGNMENT`),
  ADD KEY `ANCESTOR` (`ANCESTOR`);

--
-- Indeksy dla tabeli `treelist`
--
ALTER TABLE `treelist`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `nodelist`
--
ALTER TABLE `nodelist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `treelist`
--
ALTER TABLE `treelist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `nodelist`
--
ALTER TABLE `nodelist`
  ADD CONSTRAINT `nodelist_ibfk_1` FOREIGN KEY (`ASSIGNMENT`) REFERENCES `treelist` (`ID`),
  ADD CONSTRAINT `nodelist_ibfk_2` FOREIGN KEY (`ANCESTOR`) REFERENCES `nodelist` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
