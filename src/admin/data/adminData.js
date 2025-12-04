// Lightweight admin data provider to satisfy admin pages imports
// Restores a minimal interface: useSectionData(section) -> { title, columns, rows, add, edit, remove }

import { useMemo } from 'react';

export const SECTIONS = {
  services: {
    title: 'Services',
    columns: [
      { key: 'name', label: 'name' },
     { key: 'file', label: 'Image' },
      { key: 'role', label: 'role' }
     
    ],
    rows: [],
  },
  contact: {
    title: 'Contact',
    columns: [
      { key: 'address', label: 'Address' },
      { key: 'phone', label: 'Phone' },
       { key: 'email', label: 'Email' },
      { key: 'businessHours', label: 'BusinessHours' },

    ],

    rows: [],
  },
  enquireForm: {
    title: 'enquireForm',
    columns: [
      { key: 'name', label: 'name' },
      { key: 'phone', label: 'phone' },
       { key: 'message', label: 'message' },
         { key: 'status', label: 'status' },
      { key: 'day', label: 'day' },
       { key: 'time', label: 'time' },
       { key: 'email', label: 'email' },
       { key: 'project', label: 'project' },
       

    ],

    rows: [],
  },
  careers: {
    title: 'Careers',
    columns: [
      { key: 'title', label: 'title' },
      { key: 'department', label: 'department' },
       { key: 'location', label: 'location' },
      
      { key: 'type', label: 'type' }

       
    ],
    rows: [],
  },
  //why choose
  //Employee Benefits
  completed: {
    title: 'ProjectHouse',
    columns: [
      { key: 'projectPlace', label: 'projectPlace' },
       { key: 'name', label: 'Name' },
      { key: 'location', label: 'location' },
      { key: 'bhk', label: 'bhk' },
      { key: 'file', label: 'file' },
      
      
    ],
    rows: [],
  },
  investors: {
    title: 'Investors',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' }
    ],
    rows: [],
  },
  leadership: {
    title: 'Leadership Team',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
        { key: 'description', label: 'description' },
       { key: 'file', label: 'Image' },

  
    ],
    rows: [],
  },
   founder: {
    title: 'founder',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
        { key: 'description', label: 'description' },
        { key: 'file', label: 'file' },

  
    ],
    rows: [],
  },
  counterupdate: {
    title: 'counterupdate',
    columns: [
   { key: 'title', label: 'title' },
      { key: 'value', label: 'value' },
      { key: 'suffix', label: 'suffix' },
    ],
    rows: [],
  },
 home: {
  title: "Home Content",
  columns: [
    { key: "file", label: "Image" }
  ],
  rows: []
},
  seo: {
    title: 'SEO',
    columns: [
      { key: 'key', label: 'Key' },
      { key: 'value', label: 'Value' }
    ],
    rows: [],
  },
  projects: {
    title: 'Projects',
    columns: [
      { key: 'name', label: 'Name' },
      
      { key: 'location', label: 'location' },
      { key: 'bhk', label: 'bhk' },
       { key: 'file', label: 'file' },
       { key: 'description', label: 'description' },
       
      
    ],
    rows: [],
  },

 categorytab: {
  title: 'categorytab',

  columns: [
     { key: 'House', label: 'House' },
     { key: 'Place', label: 'Place' },
    { key: 'elevation', label: 'Elevation' },
    { key: 'floorplan', label: 'Floor Plan' },
    { key: 'isometric', label: 'Isometric View' },
    { key: 'interior', label: 'Interior' },
    { key: 'projectview', label: 'Project View' },
    { key: 'video', label: 'Video' },
    { key: 'siteprogress', label: 'Site Progress' },
  ],

  rows: [],
},
  media: {
    title: 'media',
    columns: [
      { key: 'file', label: 'file' },
     
    ],
    rows: [],
  },
  
  testimonials: {
    title: 'Testimonials',
    columns: [
      { key: 'name', label: 'name' },
      { key: 'location', label: 'location' },
      { key: 'project', label: 'project' },
       { key: 'rating', label: 'rating' },
        { key: 'text', label: 'text' },
        { key: 'file', label: 'file' },
    ],
    rows: [],
  },
};

export function useSectionData(section) {
  const config = useMemo(() => SECTIONS[section] || {
    title: section,
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'value', label: 'Value' }
    ],
    rows: [],
  }, [section]);

  const add = (row) => { console.log(`Add to ${section}:`, row); };
  const edit = (row) => { console.log(`Edit in ${section}:`, row); };
  const remove = (row) => { console.log(`Remove from ${section}:`, row); };

  return {
    title: config.title,
    columns: config.columns,
    rows: config.rows,
    add,
    edit,
    remove,
  };
}