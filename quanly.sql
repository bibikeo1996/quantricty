-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th2 09, 2022 lúc 09:03 AM
-- Phiên bản máy phục vụ: 10.4.19-MariaDB
-- Phiên bản PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `quanly`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `checkinout`
--

CREATE TABLE `checkinout` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_check` varchar(255) NOT NULL,
  `checkin` varchar(255) NOT NULL,
  `note_1` varchar(255) NOT NULL,
  `checkout` varchar(255) NOT NULL,
  `note_2` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `checkinout`
--

INSERT INTO `checkinout` (`id`, `user_id`, `name`, `date_check`, `checkin`, `note_1`, `checkout`, `note_2`) VALUES
(11, 'admin', 'Liêm', '9-2-2022', ' 11:52 ', '', '', 'quên chấm công');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthday` varchar(16) NOT NULL,
  `phone` int(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `level` int(1) NOT NULL,
  `isEm` varchar(3) NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `username`, `password`, `birthday`, `phone`, `address`, `level`, `isEm`, `date_created`) VALUES
(1, 'Liêm', 'admin', '$2b$10$8T5e90GYmORf6r.yjUr2sOSTrHuWKD.lZeD0LvQ.ZzIcbPymHqPdm', '1996-10-28', 776300794, 'Lô i chung cư tây thạnh tân phú hcm', 1, 'yes', '2022-02-05 23:53:36');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `checkinout`
--
ALTER TABLE `checkinout`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `checkinout`
--
ALTER TABLE `checkinout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
