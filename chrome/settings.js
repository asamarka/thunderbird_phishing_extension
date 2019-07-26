/*
    Security Extensions for Mozilla Thunderbird
    Copyright (C) 2015 by Ilker Temir (@ilkertemir) and Tim Sammut (@t1msammut)

    This program is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License
    as published by the Free Software Foundation; version 2
    of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

// Extension settings 

const DB_NAME = 'thundersec.sqlite';
const API_URL = 'https://www.ilkertemir.com/thundersec/api/v1/';
const VERSION = '2.0.2';
// Send generic stats every two hours
const STAT_INTERVAL = 2*60*60*1000;
