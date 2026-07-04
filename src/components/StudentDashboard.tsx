import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Search, UserPlus, Edit2, Trash2, GraduationCap, 
  Percent, BarChart2, CheckCircle2, XCircle, ChevronRight, X, Sparkles, Filter 
} from 'lucide-react';
import { initialStudents } from '../data/students';
import { Student } from '../types';

export default function StudentDashboard() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [gradeFilter, setGradeFilter] = useState('All');
  
  // Modal / Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  
  // Temporary form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRoll, setFormRoll] = useState('');
  const [formCourse, setFormCourse] = useState('Computer Science');
  const [formAttendance, setFormAttendance] = useState(90);
  const [formGrade, setFormGrade] = useState<'A' | 'B' | 'C' | 'D' | 'F'>('A');
  const [formStatus, setFormStatus] = useState<'Active' | 'Inactive'>('Active');
  
  // Custom Error States
  const [formError, setFormError] = useState('');

  // Course Options
  const courseOptions = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'];

  // Handle Edit Trigger
  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormName(student.name);
    setFormEmail(student.email);
    setFormRoll(student.rollNumber);
    setFormCourse(student.course);
    setFormAttendance(student.attendance);
    setFormGrade(student.grade);
    setFormStatus(student.status);
    setFormError('');
    setIsFormOpen(true);
  };

  // Handle Create Trigger
  const handleOpenCreate = () => {
    setEditingStudent(null);
    setFormName('');
    setFormEmail('');
    setFormRoll(`ST-${Date.now().toString().slice(-4)}`);
    setFormCourse('Computer Science');
    setFormAttendance(90);
    setFormGrade('A');
    setFormStatus('Active');
    setFormError('');
    setIsFormOpen(true);
  };

  // Form Submit Handler
  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formRoll.trim()) {
      setFormError('Please fill in all required text fields.');
      return;
    }

    if (editingStudent) {
      // Edit mode
      setStudents(students.map(s => s.id === editingStudent.id ? {
        ...s,
        name: formName,
        email: formEmail,
        rollNumber: formRoll,
        course: formCourse,
        attendance: Number(formAttendance),
        grade: formGrade,
        status: formStatus
      } : s));
    } else {
      // Add mode
      const newStudent: Student = {
        id: Date.now().toString(),
        name: formName,
        email: formEmail,
        rollNumber: formRoll,
        course: formCourse,
        attendance: Number(formAttendance),
        grade: formGrade,
        status: formStatus
      };
      setStudents([...students, newStudent]);
    }
    setIsFormOpen(false);
  };

  // Delete Student
  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this student profile?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  // Quick Status Toggle
  const handleToggleStatus = (id: string) => {
    setStudents(students.map(s => s.id === id ? {
      ...s,
      status: s.status === 'Active' ? 'Inactive' : 'Active'
    } : s));
  };

  // Statistics calculation via useMemo
  const stats = useMemo(() => {
    const total = students.length;
    const active = students.filter(s => s.status === 'Active').length;
    const avgAttendance = total > 0 
      ? Math.round(students.reduce((acc, curr) => acc + curr.attendance, 0) / total)
      : 0;
    const gradeScores = { A: 4, B: 3, C: 2, D: 1, F: 0 };
    const avgGradeScore = total > 0
      ? (students.reduce((acc, curr) => acc + gradeScores[curr.grade], 0) / total).toFixed(1)
      : '0.0';

    return { total, active, avgAttendance, avgGradeScore };
  }, [students]);

  // Filter students based on state filters
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCourse = courseFilter === 'All' || s.course === courseFilter;
      const matchGrade = gradeFilter === 'All' || s.grade === gradeFilter;

      return matchSearch && matchCourse && matchGrade;
    });
  }, [students, searchQuery, courseFilter, gradeFilter]);

  return (
    <div className="space-y-6" id="student-dashboard-root">
      {/* Header Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5" id="dashboard-header">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-1.5">
              Academy Registry <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">V2.0 PRO</span>
            </h2>
            <p className="text-xs text-slate-500">Student enrollment metrics, active course attendance logs, and marks analyzer</p>
          </div>
        </div>
        
        <button
          onClick={handleOpenCreate}
          id="add-student-trigger-btn"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all duration-150 cursor-pointer"
        >
          <UserPlus className="h-4 w-4" /> Enroll New Student
        </button>
      </div>

      {/* KPI Stats Panel */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="stats-dashboard-grid">
        <div className="bg-white border border-slate-250 p-4 rounded-xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Total Registered</span>
            <h3 className="text-2xl font-black text-slate-800 font-mono">{stats.total}</h3>
          </div>
          <GraduationCap className="h-9 w-9 text-indigo-400 stroke-1" />
        </div>

        <div className="bg-white border border-slate-250 p-4 rounded-xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Active Roster</span>
            <h3 className="text-2xl font-black text-emerald-600 font-mono">
              {stats.active} <span className="text-xs text-slate-400">/ {stats.total}</span>
            </h3>
          </div>
          <CheckCircle2 className="h-9 w-9 text-emerald-400 stroke-1" />
        </div>

        <div className="bg-white border border-slate-250 p-4 rounded-xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Avg Attendance</span>
            <h3 className="text-2xl font-black text-slate-800 font-mono">
              {stats.avgAttendance}%
            </h3>
          </div>
          <Percent className="h-9 w-9 text-amber-500 stroke-1" />
        </div>

        <div className="bg-white border border-slate-250 p-4 rounded-xl shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide block">Avg Grade Index</span>
            <h3 className="text-2xl font-black text-indigo-600 font-mono">
              {stats.avgGradeScore} <span className="text-[10px] text-slate-400">/ 4.0</span>
            </h3>
          </div>
          <BarChart2 className="h-9 w-9 text-indigo-400 stroke-1" />
        </div>
      </div>

      {/* Filter and Search Panel */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3" id="filters-dashboard-panel">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Filter className="h-3 w-3" /> Filters & Registry Controls
          </span>
          <span className="text-[10px] font-mono text-slate-500 font-bold">
            Record Match: {filteredStudents.length} / {students.length}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3" id="filters-elements-grid">
          {/* Search bar (span 6) */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search registry by name, roll code, email..."
              className="w-full text-xs bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              id="registry-search-input"
            />
          </div>

          {/* Course filter (span 3) */}
          <div className="md:col-span-3">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              id="registry-course-select"
            >
              <option value="All">All Engineering Courses</option>
              {courseOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* Grade filter (span 3) */}
          <div className="md:col-span-3">
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="w-full text-xs bg-white border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              id="registry-grade-select"
            >
              <option value="All">All Grade Scales</option>
              {['A', 'B', 'C', 'D', 'F'].map(g => <option key={g} value={g}>Grade {g}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Roster Table Grid */}
      <div className="bg-white border border-slate-250 rounded-xl overflow-hidden shadow-xs" id="registry-table-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" id="student-roster-table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="p-4">Student Profile</th>
                <th className="p-4">Roll Code</th>
                <th className="p-4">Course Division</th>
                <th className="p-4 text-center">Attendance</th>
                <th className="p-4 text-center">Grade</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              <AnimatePresence mode="popLayout">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => {
                    // Color-code attendance
                    const attendanceColor = student.attendance >= 90
                      ? 'text-emerald-600 bg-emerald-50 border-emerald-100'
                      : student.attendance >= 75
                      ? 'text-amber-600 bg-amber-50 border-amber-100'
                      : 'text-rose-600 bg-rose-50 border-rose-100';

                    // Color-code grade
                    const gradeColors = {
                      A: 'bg-indigo-50 text-indigo-700 border-indigo-100',
                      B: 'bg-blue-50 text-blue-700 border-blue-100',
                      C: 'bg-teal-50 text-teal-700 border-teal-100',
                      D: 'bg-amber-50 text-amber-700 border-amber-100',
                      F: 'bg-rose-50 text-rose-700 border-rose-100',
                    };

                    return (
                      <motion.tr
                        key={student.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-slate-50/50 transition-colors"
                        id={`student-row-${student.id}`}
                      >
                        {/* Student profile */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span className="h-8.5 w-8.5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-indigo-700 select-none">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                            <div>
                              <h4 className="font-bold text-slate-800 leading-snug">{student.name}</h4>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{student.email}</p>
                            </div>
                          </div>
                        </td>

                        {/* Roll number */}
                        <td className="p-4">
                          <span className="font-mono text-[11px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50">
                            {student.rollNumber}
                          </span>
                        </td>

                        {/* Course */}
                        <td className="p-4">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-slate-700">{student.course}</span>
                            <span className="block text-[9px] text-slate-400">Engineering Faculty</span>
                          </div>
                        </td>

                        {/* Attendance */}
                        <td className="p-4 text-center">
                          <div className="inline-flex flex-col items-center gap-1">
                            <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded border ${attendanceColor}`}>
                              {student.attendance}%
                            </span>
                            <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${student.attendance >= 90 ? 'bg-emerald-500' : student.attendance >= 75 ? 'bg-amber-500' : 'bg-rose-500'}`}
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Grade */}
                        <td className="p-4 text-center">
                          <span className={`font-black font-mono px-2.5 py-0.5 rounded-md border text-xs ${gradeColors[student.grade]}`}>
                            {student.grade}
                          </span>
                        </td>

                        {/* Status Toggle */}
                        <td className="p-4 text-center">
                          <button
                            id={`student-status-toggle-${student.id}`}
                            onClick={() => handleToggleStatus(student.id)}
                            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                              student.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
                                : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
                            }`}
                          >
                            <span className={`h-1.5 w-1.5 rounded-full ${student.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                            {student.status}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="p-4 text-right">
                          <div className="inline-flex gap-1.5">
                            <button
                              id={`student-edit-${student.id}`}
                              onClick={() => handleOpenEdit(student)}
                              className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                              title="Edit student records"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              id={`student-delete-${student.id}`}
                              onClick={() => handleDeleteStudent(student.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                              title="Delete profile"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-slate-400 space-y-2">
                      <GraduationCap className="h-12 w-12 stroke-1 text-slate-300 mx-auto animate-bounce" />
                      <h5 className="text-sm font-semibold text-slate-700">No student profiles found</h5>
                      <p className="text-xs text-slate-400 max-w-sm mx-auto">
                        There are no student files matching the search query or criteria set inside filters.
                      </p>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Enrollment & Editing Overlay Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4" id="student-modal-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-xl max-w-lg w-full shadow-2xl overflow-hidden"
              id="student-form-modal"
            >
              <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                    <Sparkles className="h-4.5 w-4.5 text-indigo-600" />
                    {editingStudent ? 'Edit Student File' : 'Enroll New Student'}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Please specify precise parameters to maintain institutional accuracy.</p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                  id="close-student-modal-btn"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <form onSubmit={handleSaveStudent} className="p-5 space-y-4">
                {formError && (
                  <div className="bg-rose-50 border border-rose-100 text-rose-700 p-2.5 rounded-lg text-[11px] font-semibold">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Student Full Name *</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      required
                      placeholder="e.g. Alice Cooper"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Institute Email Address *</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      required
                      placeholder="e.g. alice@academy.edu"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Institutional Roll Code *</label>
                    <input
                      type="text"
                      value={formRoll}
                      onChange={(e) => setFormRoll(e.target.value)}
                      required
                      placeholder="e.g. CS-2026-088"
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 font-mono focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Course Division</label>
                    <select
                      value={formCourse}
                      onChange={(e) => setFormCourse(e.target.value)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                    >
                      {courseOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Attendance Percentage ({formAttendance}%)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formAttendance}
                      onChange={(e) => setFormAttendance(Number(e.target.value))}
                      className="w-full accent-indigo-600 cursor-pointer mt-2"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Assigned Grade</label>
                    <select
                      value={formGrade}
                      onChange={(e) => setFormGrade(e.target.value as any)}
                      className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                    >
                      {['A', 'B', 'C', 'D', 'F'].map(g => <option key={g} value={g}>Grade {g}</option>)}
                    </select>
                  </div>

                  <div className="col-span-2 bg-slate-50 border border-slate-200 rounded-lg p-3 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] font-bold text-slate-600 uppercase block">Roster Registration Status</span>
                      <span className="text-[11px] text-slate-400">Controls student listing visibility in gradebook.</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFormStatus('Active')}
                        className={`px-3 py-1 text-xs rounded-md border font-semibold cursor-pointer ${
                          formStatus === 'Active'
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Active
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormStatus('Inactive')}
                        className={`px-3 py-1 text-xs rounded-md border font-semibold cursor-pointer ${
                          formStatus === 'Inactive'
                            ? 'bg-rose-500 text-white border-rose-600'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        Inactive
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs px-4 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
                  >
                    Discard Changes
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-5 py-2 rounded-lg font-bold transition-colors cursor-pointer"
                  >
                    {editingStudent ? 'Save File' : 'Enroll Student'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
